import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ChatMessage } from '../models/ChatMessage';
import { Subscription } from '../models/Subscription';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

export const setupSocketHandlers = (io: Server) => {
  // Middleware de autenticación para Socket.IO
  io.use((socket: AuthenticatedSocket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Token requerido'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      socket.userId = (decoded as any).userId;
      socket.userRole = (decoded as any).role;
      next();
    } catch (error) {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`🔗 Usuario conectado: ${socket.userId}`);

    // Unirse a una sala de chat específica
    socket.on('join-room', (data: { creatorId: string }) => {
      const { creatorId } = data;
      
      // Verificar si está suscrito
      Subscription.findOne({
        fanId: socket.userId,
        creatorId,
        status: 'active'
      }).then(subscription => {
        if (subscription) {
          socket.join(`creator-${creatorId}`);
          socket.emit('joined-room', { creatorId });
        } else {
          socket.emit('error', { message: 'Necesitas estar suscrito para unirte al chat' });
        }
      });
    });

    // Enviar mensaje
    socket.on('send-message', async (data: { 
      creatorId: string; 
      content: string; 
      type?: 'text' | 'image' | 'video';
      fileUrl?: string;
    }) => {
      const { creatorId, content, type = 'text', fileUrl } = data;
      
      try {
        // Verificar suscripción
        const subscription = await Subscription.findOne({
          fanId: socket.userId,
          creatorId,
          status: 'active'
        });

        if (!subscription) {
          socket.emit('error', { message: 'No estás suscrito a esta creadora' });
          return;
        }

        // Crear mensaje
        const message = new ChatMessage({
          senderId: socket.userId,
          receiverId: creatorId,
          content,
          type,
          fileUrl
        });

        await message.save();
        await message.populate([
          { path: 'senderId', select: 'username' },
          { path: 'receiverId', select: 'username' }
        ]);

        // Enviar a la sala del creador
        io.to(`creator-${creatorId}`).emit('new-message', message);
        
        // Guardar en sala del remitente
        socket.join(`user-${socket.userId}-${creatorId}`);

      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        socket.emit('error', { message: 'Error al enviar mensaje' });
      }
    });

    // Marcar mensajes como leídos
    socket.on('mark-read', async (data: { creatorId: string }) => {
      try {
        await ChatMessage.updateMany(
          { 
            receiverId: socket.userId,
            senderId: data.creatorId,
            isRead: false
          },
          { isRead: true }
        );

        socket.emit('messages-marked-read');
      } catch (error) {
        console.error('Error al marcar mensajes como leídos:', error);
      }
    });

    // Obtener historial de chat
    socket.on('get-chat-history', async (data: { creatorId: string }) => {
      try {
        const { creatorId } = data;
        
        // Verificar suscripción
        const subscription = await Subscription.findOne({
          fanId: socket.userId,
          creatorId,
          status: 'active'
        });

        if (!subscription) {
          socket.emit('error', { message: 'No estás suscrito a esta creadora' });
          return;
        }

        // Obtener mensajes
        const messages = await ChatMessage.find({
          $or: [
            { senderId: socket.userId, receiverId: creatorId },
            { senderId: creatorId, receiverId: socket.userId }
          ]
        })
        .sort({ createdAt: 1 })
        .limit(50)
        .populate([
          { path: 'senderId', select: 'username' },
          { path: 'receiverId', select: 'username' }
        ]);

        socket.emit('chat-history', messages);
        
      } catch (error) {
        console.error('Error al obtener historial:', error);
        socket.emit('error', { message: 'Error al obtener historial de chat' });
      }
    });

    // Desconexión
    socket.on('disconnect', () => {
      console.log(`🔌 Usuario desconectado: ${socket.userId}`);
    });
  });
};
