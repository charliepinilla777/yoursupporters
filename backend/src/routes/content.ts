import { Router, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import { Content } from '../models/Content';
import { User } from '../models/User';
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

// Obtener contenido de una creadora
router.get('/creator/:creatorId', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req: Request & { user?: any }, res: Response) => {
  try {
    const { creatorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Verificar si el usuario está suscrito
    let isSubscribed = false;
    if (req.user) {
      const subscription = await Subscription.findOne({
        fanId: req.user.userId,
        creatorId,
        status: 'active'
      });
      isSubscribed = !!subscription;
    }

    // Obtener contenido
    const content = await Content.find({ creatorId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creatorId', 'username verificationStatus');

    const total = await Content.countDocuments({ creatorId });

    res.json({
      content,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      isSubscribed
    });

  } catch (error) {
    console.error('Error al obtener contenido:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Subir nuevo contenido (solo creadoras verificadas)
router.post('/upload', authenticateToken, [
  body('title').isLength({ min: 1, max: 100 }).trim(),
  body('description').optional().isLength({ max: 1000 }).trim(),
  body('type').isIn(['photo', 'video']),
  body('isFree').isBoolean(),
  body('price').optional().isFloat({ min: 0 }),
  body('tags').optional().isArray()
], async (req: Request & { user?: any }, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'model' || user.verificationStatus !== 'approved') {
      return res.status(403).json({ 
        error: 'Solo creadoras verificadas pueden subir contenido' 
      });
    }

    const { title, description, type, isFree, price, tags } = req.body;
    
    const content = new Content({
      creatorId: user._id,
      title,
      description,
      type,
      isFree,
      price: isFree ? 0 : price || user.subscriptionPrice,
      tags: tags || []
    });

    await content.save();
    await content.populate('creatorId', 'username');

    res.status(201).json({
      message: 'Contenido subido exitosamente',
      content
    });

  } catch (error) {
    console.error('Error al subir contenido:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Dar like a contenido
router.post('/:contentId/like', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const { contentId } = req.params;
    const userId = req.user.userId;

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }

    // Verificar si ya dio like
    const alreadyLiked = content.likes.includes(userId);
    if (alreadyLiked) {
      // Quitar like usando $pull
      await Content.findByIdAndUpdate(
        contentId,
        { $pull: { likes: userId } }
      );
    } else {
      // Agregar like
      content.likes.push(userId);
      await content.save();
    }
    res.json({ 
      message: alreadyLiked ? 'Like quitado' : 'Like agregado',
      likesCount: content.likes.length
    });

  } catch (error) {
    console.error('Error en like:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
