import { Router, Request, Response } from 'express';
import { body, query } from 'express-validator';
import { ChatMessage } from '../models/ChatMessage';
import { Subscription } from '../models/Subscription';

const router = Router();

// Middleware para verificar autenticación
const authenticateToken = (req: Request & { user?: any }, res: Response, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Obtener conversaciones del usuario
router.get('/conversations', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user.userId;

    // Obtener conversaciones únicas
    const conversations = await ChatMessage.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { if: { $eq: ['$senderId', userId] }, then: '$receiverId' },
              { if: { $eq: ['$receiverId', userId] }, then: '$senderId' }
            ]
          },
          lastMessage: { $last: '$createdAt' },
          unreadCount: {
            $sum: {
              $cond: [
                { if: { $and: [{ $eq: ['$receiverId', userId] }, { $eq: ['$isRead', false] }] }, then: 1 },
                { else: 0 }
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'otherUser'
        }
      },
      { $sort: { lastMessage: -1 } }
    ]);

    res.json({
      conversations
    });

  } catch (error) {
    console.error('Error al obtener conversaciones:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener mensajes de una conversación específica
router.get('/messages/:otherUserId', authenticateToken, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req: Request & { user?: any }, res: Response) => {
  try {
    const userId = req.user.userId;
    const { otherUserId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const messages = await ChatMessage.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate([
          { path: 'senderId', select: 'username' },
          { path: 'receiverId', select: 'username' }
        ]);

    const total = await ChatMessage.countDocuments({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    });

    // Marcar mensajes como leídos
    await ChatMessage.updateMany(
      { receiverId: userId, senderId: otherUserId, isRead: false },
      { isRead: true }
    );

    res.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Enviar mensaje (API REST como respaldo)
router.post('/send', authenticateToken, [
  require('express-validator').body('content').isLength({ min: 1, max: 1000 }).trim(),
  require('express-validator').body('type').optional().isIn(['text', 'image', 'video']),
  require('express-validator').body('fileUrl').optional().isURL()
], async (req: Request & { user?: any }, res: Response) => {
  try {
    const errors = require('express-validator').validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, type = 'text', fileUrl } = req.body;
    const { receiverId } = req.body;
    const senderId = req.user.userId;

    // Verificar si está suscrito al receptor
    if (req.user.userRole !== 'admin' && req.user.userRole !== 'supervisor') {
      const subscription = await Subscription.findOne({
        fanId: senderId,
        creatorId: receiverId,
        status: 'active'
      });

      if (!subscription && req.user.userRole !== 'model') {
        return res.status(403).json({ error: 'No puedes enviar mensajes a esta creadora' });
      }
    }

    const message = new ChatMessage({
      senderId,
      receiverId,
      content,
      type,
      fileUrl
    });

    await message.save();
    await message.populate([
          { path: 'senderId', select: 'username' },
          { path: 'receiverId', select: 'username' }
        ]);

    res.status(201).json({
      message: 'Mensaje enviado exitosamente',
      data: message
    });

  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
