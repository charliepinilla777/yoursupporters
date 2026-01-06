import { Router, Request, Response } from 'express';
import { Subscription } from '../models/Subscription';
import { User } from '../models/User';

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

// Suscribirse a una creadora
router.post('/subscribe/:creatorId', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { creatorId } = req.params;
    const fanId = req.user.userId;

    // Verificar si ya está suscrito
    const existingSubscription = await Subscription.findOne({
      fanId,
      creatorId,
      status: 'active'
    });

    if (existingSubscription) {
      return res.status(400).json({ error: 'Ya estás suscrito a esta creadora' });
    }

    // Obtener información de la creadora
    const creator = await User.findById(creatorId);
    if (!creator || creator.role !== 'model') {
      return res.status(404).json({ error: 'Creadora no encontrada' });
    }

    // Crear suscripción
    const subscription = new Subscription({
      fanId,
      creatorId,
      price: creator.subscriptionPrice,
      startDate: new Date(),
      status: 'active'
    });

    await subscription.save();
    await subscription.populate([
      { path: 'fanId', select: 'username' },
      { path: 'creatorId', select: 'username' }
    ]);

    res.status(201).json({
      message: 'Suscripción exitosa',
      subscription
    });

  } catch (error) {
    console.error('Error en suscripción:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Cancelar suscripción
router.delete('/unsubscribe/:creatorId', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { creatorId } = req.params;
    const fanId = req.user.userId;

    const subscription = await Subscription.findOneAndUpdate(
      { fanId, creatorId, status: 'active' },
      { 
        status: 'cancelled',
        endDate: new Date()
      },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ error: 'Suscripción no encontrada' });
    }

    res.json({
      message: 'Suscripción cancelada exitosamente'
    });

  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener suscripciones del usuario actual
router.get('/my-subscriptions', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const fanId = req.user.userId;

    const subscriptions = await Subscription.find({ fanId, status: 'active' })
      .populate('creatorId', 'username profile.bio verificationStatus')
      .sort({ createdAt: -1 });

    res.json({
      subscriptions
    });

  } catch (error) {
    console.error('Error al obtener suscripciones:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener suscriptores de una creadora
router.get('/my-subscribers', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const creatorId = req.user.userId;

    // Verificar que sea una creadora
    const user = await User.findById(creatorId);
    if (!user || user.role !== 'model') {
      return res.status(403).json({ error: 'Solo las creadoras pueden ver sus suscriptores' });
    }

    const subscribers = await Subscription.find({ creatorId, status: 'active' })
      .populate('fanId', 'username')
      .sort({ startDate: -1 });

    const stats = {
      total: subscribers.length,
      revenue: subscribers.length * user.subscriptionPrice,
      newThisMonth: subscribers.filter((sub: any) => {
        const subDate = new Date(sub.startDate);
        const now = new Date();
        return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
      }).length
    };

    res.json({
      subscribers,
      stats
    });

  } catch (error) {
    console.error('Error al obtener suscriptores:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
