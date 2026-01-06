import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones
  message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde.'
});
app.use('/api/', limiter);

// Datos de demo (simulando base de datos)
const demoUsers = [
  {
    _id: '1',
    username: 'sofia_creative',
    email: 'sofia@example.com',
    role: 'model',
    verificationStatus: 'approved',
    profile: {
      bio: 'Creadora de contenido exclusivo 🎨',
      instagram: '@sofia_creative',
      x: '@sofia_x',
      website: 'sofia.com'
    },
    subscriptionPrice: 9.99
  },
  {
    _id: '2',
    username: 'maria_art',
    email: 'maria@example.com',
    role: 'model',
    verificationStatus: 'approved',
    profile: {
      bio: 'Artista digital y fotógrafa 📸',
      instagram: '@maria_art',
      x: '@maria_x'
    },
    subscriptionPrice: 14.99
  },
  {
    _id: '3',
    username: 'luna_style',
    email: 'luna@example.com',
    role: 'model',
    verificationStatus: 'pending',
    profile: {
      bio: 'Modelo y creadora de moda 👗',
      instagram: '@luna_style'
    },
    subscriptionPrice: 12.99
  }
];

const demoSubscriptions = [
  { fanId: 'demo-user', creatorId: '1', status: 'active', startDate: new Date() },
  { fanId: 'demo-user', creatorId: '2', status: 'active', startDate: new Date() }
];

// Rutas API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend de Super Hot funcionando',
    timestamp: new Date()
  });
});

// Obtener lista de creadoras
app.get('/api/users/creators', (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  
  let filteredCreators = demoUsers.filter(user => 
    user.role === 'model' && user.verificationStatus === 'approved'
  );

  if (search) {
    filteredCreators = filteredCreators.filter(creator =>
      creator.username.toLowerCase().includes((search as string).toLowerCase()) ||
      creator.profile.bio.toLowerCase().includes((search as string).toLowerCase())
    );
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const paginatedCreators = filteredCreators.slice(startIndex, endIndex);

  res.json({
    creators: paginatedCreators,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: filteredCreators.length,
      pages: Math.ceil(filteredCreators.length / Number(limit))
    }
  });
});

// Obtener perfil de creadora
app.get('/api/creators/:creatorId', (req, res) => {
  const { creatorId } = req.params;
  const creator = demoUsers.find(user => user._id === creatorId);

  if (!creator) {
    return res.status(404).json({ error: 'Creadora no encontrada' });
  }

  const isSubscribed = demoSubscriptions.some(sub => 
    sub.creatorId === creatorId && sub.status === 'active'
  );

  const subscriberCount = demoSubscriptions.filter(sub => 
    sub.creatorId === creatorId && sub.status === 'active'
  ).length;

  res.json({
    creator: {
      ...creator,
      isSubscribed,
      subscriberCount
    }
  });
});

// Registro de usuario
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, role } = req.body;

  // Validación básica
  if (!username || !email || !password) {
    return res.status(400).json({ 
      error: 'Faltan campos requeridos' 
    });
  }

  // Simular registro exitoso
  const newUser = {
    _id: Date.now().toString(),
    username,
    email,
    role: role || 'user',
    verificationStatus: 'pending'
  };

  res.status(201).json({
    message: 'Usuario creado exitosamente',
    token: 'demo-token-' + Date.now(),
    user: newUser
  });
});

// Login de usuario
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      error: 'Email y contraseña requeridos' 
    });
  }

  // Simular login exitoso
  const user = demoUsers.find(u => u.email === email) || {
    _id: 'demo-user',
    username: 'demo_fan',
    email,
    role: 'user'
  };

  res.json({
    message: 'Login exitoso',
    token: 'demo-token-' + Date.now(),
    user
  });
});

// Suscribirse a creadora
app.post('/api/subscriptions/subscribe/:creatorId', (req, res) => {
  const { creatorId } = req.params;
  const creator = demoUsers.find(u => u._id === creatorId);

  if (!creator) {
    return res.status(404).json({ error: 'Creadora no encontrada' });
  }

  const existingSubscription = demoSubscriptions.find(sub =>
    sub.creatorId === creatorId && sub.status === 'active'
  );

  if (existingSubscription) {
    return res.status(400).json({ error: 'Ya estás suscrito a esta creadora' });
  }

  const newSubscription = {
    fanId: 'demo-user',
    creatorId,
    price: creator.subscriptionPrice,
    startDate: new Date(),
    status: 'active'
  };

  demoSubscriptions.push(newSubscription);

  res.status(201).json({
    message: 'Suscripción exitosa',
    subscription: newSubscription
  });
});

// Cancelar suscripción
app.delete('/api/subscriptions/unsubscribe/:creatorId', (req, res) => {
  const { creatorId } = req.params;
  const subIndex = demoSubscriptions.findIndex(sub =>
    sub.creatorId === creatorId && sub.status === 'active'
  );

  if (subIndex === -1) {
    return res.status(404).json({ error: 'Suscripción no encontrada' });
  }

  (demoSubscriptions[subIndex] as any).status = 'cancelled';
  (demoSubscriptions[subIndex] as any).endDate = new Date();

  res.json({
    message: 'Suscripción cancelada exitosamente'
  });
});

// Obtener suscripciones del usuario
app.get('/api/subscriptions/my-subscriptions', (req, res) => {
  const userSubscriptions = demoSubscriptions
    .filter(sub => sub.fanId === 'demo-user' && sub.status === 'active')
    .map(sub => {
      const creator = demoUsers.find(u => u._id === sub.creatorId);
      return { ...sub, creator };
    });

  res.json({
    subscriptions: userSubscriptions
  });
});

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend de Super Hot corriendo en puerto ${PORT}`);
  console.log(`📱 Frontend: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
  console.log(`🔥 Health check: http://localhost:${PORT}/api/health`);
});
