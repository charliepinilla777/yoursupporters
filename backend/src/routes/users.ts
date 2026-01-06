import { Router, Request, Response } from 'express';
import { query } from 'express-validator';
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

// Obtener perfil de usuario
router.get('/profile', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('subscriptions');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Actualizar perfil
router.put('/profile', authenticateToken, [
  require('express-validator').body('username').optional().isLength({ min: 3, max: 30 }).trim(),
  require('express-validator').body('profile.bio').optional().isLength({ max: 500 }).trim(),
  require('express-validator').body('profile.instagram').optional().isURL(),
  require('express-validator').body('profile.x').optional().isURL(),
  require('express-validator').body('profile.website').optional().isURL()
], async (req: Request & { user?: any }, res: Response) => {
  try {
    const errors = require('express-validator').validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, profile, subscriptionPrice } = req.body;
    const userId = req.user.userId;

    // Verificar si el username ya está en uso
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        ...(username && { username }),
        ...(profile && { profile }),
        ...(subscriptionPrice !== undefined && { subscriptionPrice })
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Perfil actualizado exitosamente',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener lista de creadoras
router.get('/creators', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().isLength({ max: 100 }).trim()
], async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    // Construir filtro
    const filter: any = { 
      role: 'model',
      verificationStatus: 'approved'
    };

    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { 'profile.bio': { $regex: search, $options: 'i' } }
      ];
    }

    const creators = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      creators,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error al obtener creadoras:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
