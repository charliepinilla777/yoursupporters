import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { Content } from '../models/Content';
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

// Obtener perfil de una creadora específica
router.get('/:creatorId', async (req: Request & { user?: any }, res: Response) => {
  try {
    const { creatorId } = req.params;

    const creator = await User.findById(creatorId)
      .select('-password')
      .populate({
        path: 'content',
        options: { sort: { createdAt: -1 }, limit: 6 }
      });

    if (!creator) {
      return res.status(404).json({ error: 'Creadora no encontrada' });
    }

    // Verificar si el usuario está suscrito
    let isSubscribed = false;
    let subscriberCount = 0;

    if (req.user) {
      const subscription = await Subscription.findOne({
        fanId: req.user.userId,
        creatorId,
        status: 'active'
      });
      isSubscribed = !!subscription;
    }

    // Obtener número de suscriptores
    subscriberCount = await Subscription.countDocuments({
      creatorId,
      status: 'active'
    });

    res.json({
      creator: {
        ...creator.toObject(),
        isSubscribed,
        subscriberCount
      }
    });

  } catch (error) {
    console.error('Error al obtener creadora:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener estadísticas de creadora (solo para la propia creadora)
router.get('/:creatorId/stats', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { creatorId } = req.params;
    const userId = req.user.userId;

    // Verificar que sea la propia creadora o admin
    const user = await User.findById(userId);
    if (!user || (user._id.toString() !== creatorId && user.role !== 'admin')) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    // Estadísticas básicas
    const stats = await Promise.all([
      Subscription.countDocuments({ creatorId, status: 'active' }),
      Content.countDocuments({ creatorId }),
      Content.countDocuments({ creatorId, isFree: false }),
      Content.aggregate([
        { $match: { creatorId } },
        { $group: { _id: null, totalLikes: { $sum: { $size: '$likes' } } } }
      ])
    ]);

    const [subscribers, totalContent, paidContent, likesResult] = stats;
    const totalLikes = likesResult[0]?.totalLikes || 0;

    // Ingresos estimados
    const estimatedRevenue = subscribers * (user.subscriptionPrice || 9.99);

    res.json({
      stats: {
        subscribers,
        totalContent,
        paidContent,
        totalLikes,
        estimatedRevenue,
        subscriptionPrice: user.subscriptionPrice || 9.99
      }
    });

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
