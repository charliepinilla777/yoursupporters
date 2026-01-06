<div align="center">

# 🔥 Super Hot - Plataforma de Suscripciones para Creadoras

[![Super Hot](https://img.shields.io/badge/Super%20Hot-🔥-ff1744?style=for-the-badge&logo=fire&logoColor=white)](https://github.com/charliepinilla777/SuperHot)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

> 🌟 **La plataforma más caliente para creadoras de contenido**  
> 💎 **Diseño gótico moderno con experiencia premium**  
> 🔥 **Sistema completo de suscripciones y monetización**

---

## 📸 **Capturas de Pantalla**

<div align="center">
  <img src="https://via.placeholder.com/800x400/1a1a1a/D4AF37?text=Super+Hot+Platform" alt="Super Hot Platform" style="width: 100%; max-width: 800px; border-radius: 10px; margin: 10px 0;">
</div>

---

## 🚀 **Características Principales**

### 🎨 **Frontend Premium**
- **🌈 Botones Animados**: Gradiente arcoíris con efectos de estrellas y glow
- **🏛️ Diseño Gótico**: UI elegante y sofisticada
- **📱 Responsive Perfecto**: Mobile-first con bottom navigation
- **🌍 Multiidioma**: Switcher ES/EN integrado
- **🔐 Autenticación Segura**: JWT con persistencia de sesión
- **🎭 Tema Personalizable**: Variables CSS con dorado (#D4AF37)

### 🚀 **Backend Potente**
- **⚡ API RESTful**: Endpoints completos y optimizados
- **🔌 MongoDB**: Base de datos NoSQL escalable
- **🔐 JWT**: Tokens seguros con middleware de protección
- **💬 Chat Real-time**: Socket.IO para mensajería instantánea
- **☁️ Cloudinary**: Upload de archivos con CDN
- **📧 Nodemailer**: Sistema de notificaciones por email
- **🛡️ Seguridad**: Rate limiting, CORS, Helmet

---

## 🛠️ **Stack Tecnológico**

### 🎯 **Frontend**
```typescript
// React 18 + TypeScript
React 18.2.0
TypeScript 5.3.3
Vite 5.4.21
React Router DOM 6.20.1

// Estilos y Animaciones
CSS3 con Keyframes Personalizados
PostCSS para Procesamiento
Gradientes Arcoíris Animados
Efectos Glow y Estrellas
```

### ⚙️ **Backend**
```typescript
// Node.js + Express
Node.js 20.x
Express.js 4.18.2
TypeScript 5.3.3

// Base de Datos y Auth
MongoDB con Mongoose ODM
JWT para Autenticación
bcryptjs para Hashing

// Real-time y Storage
Socket.IO 4.7.4
Cloudinary para Archivos
Nodemailer para Emails
```

---

## 🚀 **Instalación Rápida**

### 📋 **Prerrequisitos**
```bash
# Node.js 18+
node --version  # v18.0.0+

# MongoDB
mongod --version  # 6.0+

# Git
git --version  # 2.30+
```

### ⚡ **Instalación**
```bash
# 1. Clonar el repositorio
git clone https://github.com/charliepinilla777/SuperHot.git
cd SuperHot

# 2. Instalar dependencias del frontend
npm install

# 3. Instalar dependencias del backend
cd backend
npm install

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

### 🎮 **Ejecución**
```bash
# Iniciar Frontend (Terminal 1)
npm run dev
# 🌐 http://localhost:5173

# Iniciar Backend Demo (Terminal 2)
cd backend
npm run dev-demo
# 🔥 http://localhost:3002/api/health

# O con MongoDB (si tienes MongoDB instalado)
npm run dev
```

---

## 📱 **Demo en Vivo**

<div align="center">

### 🌐 **Acceso a la Aplicación**
| Componente | URL | Descripción |
|------------|-----|-------------|
| 🏠 **Frontend** | [http://localhost:5173](http://localhost:5173) | Aplicación completa |
| 🚀 **Backend API** | [http://localhost:3002](http://localhost:3002) | API RESTful |
| ❤️ **Health Check** | [http://localhost:3002/api/health](http://localhost:3002/api/health) | Estado del servidor |

### 🎯 **Funcionalidades Demo**
- ✅ **Registro y Login** Completo
- ✅ **Exploración de Creadoras** con búsqueda
- ✅ **Perfiles Detallados** con suscripciones
- ✅ **Chat en Tiempo Real** funcional
- ✅ **Dashboard para Creadoras** con estadísticas
- ✅ **Sistema de Pagos** simulado

</div>

---

## 🏗️ **Estructura del Proyecto**

```
SuperHot/
├── 📁 src/                          # Frontend React
│   ├── 🎨 components/               # Componentes UI
│   │   ├── AppHeader.tsx            # Header principal
│   │   ├── BottomTabs.tsx           # Navegación móvil
│   │   ├── GothicFrame.tsx          # Marco gótico
│   │   └── LanguageSwitcher.tsx     # Switcher ES/EN
│   ├── 📱 contexts/                # Contextos React
│   │   └── AuthContext.tsx          # Autenticación
│   ├── 🔧 lib/                     # Utilidades
│   │   ├── api.ts                  # Cliente API
│   │   └── i18n.ts                 # Traducciones
│   ├── 📄 pages/                   # Páginas
│   │   ├── Landing.tsx              # Página principal
│   │   ├── Explore.tsx              # Explorar creadoras
│   │   ├── CreatorProfile.tsx        # Perfil de creadora
│   │   ├── Chat.tsx                 # Chat en tiempo real
│   │   └── CreatorDashboard.tsx      # Dashboard
│   └── 🎨 assets/                  # Recursos visuales
│       ├── hermes-pattern.svg        # Patrón de fondo
│       └── lv-pattern.svg           # Patrón alternativo
├── 🚀 backend/                       # Backend Node.js
│   ├── 📁 src/
│   │   ├── ⚙️ config/               # Configuración
│   │   │   └── database.ts          # Conexión MongoDB
│   │   ├── 📊 models/               # Modelos de datos
│   │   │   ├── User.ts              # Usuario
│   │   │   ├── Content.ts           # Contenido
│   │   │   ├── Subscription.ts      # Suscripción
│   │   │   └── ChatMessage.ts       # Mensajes
│   │   ├── 🛣️ routes/               # Rutas API
│   │   │   ├── auth.ts              # Autenticación
│   │   │   ├── content.ts           # Gestión de contenido
│   │   │   ├── subscriptions.ts     # Suscripciones
│   │   │   ├── chat.ts              # Chat
│   │   │   ├── creators.ts          # Creadoras
│   │   │   └── users.ts             # Usuarios
│   │   ├── 💬 socket/               # Socket.IO
│   │   │   └── chatHandlers.ts      # Handlers de chat
│   │   └── 🚀 index.ts             # Servidor principal
│   ├── 🔧 .env.example               # Variables de entorno
│   └── 📦 package.json              # Dependencias
├── 📄 README.md                      # Documentación
├── 🚫 .gitignore                    # Archivos ignorados
└── 📦 package.json                  # Configuración del proyecto
```

---

## 🎨 **Personalización y Temas**

### 🌈 **Colores Principales**
```css
:root {
  --gold: #D4AF37;           /* Dorado principal */
  --surface-1: #1a1a1a;     /* Fondo oscuro */
  --surface-2: #2a2a2a;     /* Cards y componentes */
  --surface-3: #3a3a3a;     /* Hover y focus */
  --text: #ffffff;            /* Texto principal */
  --text-secondary: #b0b0b0;  /* Texto secundario */
}
```

### ✨ **Animaciones Personalizadas**
```css
/* Botones con gradiente arcoíris */
@keyframes gradient_301 {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Efecto de estrellas */
@keyframes stars {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-1000px); }
}

/* Efecto glow */
@keyframes glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🔐 **Seguridad Implementada**

### 🛡️ **Protecciones**
- **🔑 JWT Tokens**: Autenticación segura con expiración
- **🚦 Rate Limiting**: 100 peticiones por 15 minutos
- **🌐 CORS**: Configuración segura de orígenes
- **🪖 Helmet**: Headers de seguridad HTTP
- **✅ Input Validation**: Express-validator para datos
- **🔒 bcryptjs**: Hashing seguro de contraseñas

### 🔒 **Variables de Entorno**
```bash
# JWT Secret (cambiar en producción)
JWT_SECRET=super-secret-key-change-this

# MongoDB URI
MONGODB_URI=mongodb://localhost:27017/super-hot

# Cloudinary (para archivos)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 📈 **Escalabilidad y Producción**

### 🚀 **Despliegue**
```bash
# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Con PM2 (producción)
pm2 start ecosystem.config.js
```

### 📊 **Monitoreo**
- **📈 Analytics**: Google Analytics integrado
- **🔍 Logging**: Winston para errores
- **💾 Backups**: Automatizados con MongoDB
- **⚡ Performance**: Redis para caché (opcional)

### 🐳 **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3002
CMD ["npm", "start"]
```

---

## 🤝 **Cómo Contribuir**

### 🌟 **Guía de Contribución**
1. **🍴 Fork** el repositorio
2. **🌿 Crear** branch: `git checkout -b feature/nueva-funcionalidad`
3. **💻 Desarrollar** tus cambios
4. **✅ Testear**: `npm test`
5. **📤 Commit**: `git commit -m "✨ Agregar nueva funcionalidad"`
6. **📤 Push**: `git push origin feature/nueva-funcionalidad`
7. **🔄 Pull Request**: Crear PR en GitHub

### 🎯 **Áreas de Contribución**
- 🐛 **Bug Fixes**: Reportar y solucionar errores
- ✨ **Nuevas Features**: Proponer funcionalidades
- 📚 **Documentación**: Mejorar README y comentarios
- 🎨 **UI/UX**: Diseño y experiencia de usuario
- ⚡ **Performance**: Optimización y velocidad

---

## 📄 **Licencia**

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Copyright © 2024 [Super Hot](https://github.com/charliepinilla777/SuperHot)

> 📜 **MIT License** - Uso libre para propósitos comerciales y personales  
> ❤️ **Desarrollado con pasión y TypeScript**

</div>

---

## 🔗 **Enlaces Importantes**

<div align="center">

### 🌐 **Links del Proyecto**
| 🔗 | Enlace | Descripción |
|-----|--------|-------------|
| 🏠 **Repositorio** | [GitHub](https://github.com/charliepinilla777/SuperHot) | Código fuente |
| 🚀 **Demo** | [Live Demo](http://localhost:5173) | Aplicación funcionando |
| 📧 **Issues** | [Reportar Bug](https://github.com/charliepinilla777/SuperHot/issues) | Reportar problemas |
| 💬 **Discusiones** | [Discussions](https://github.com/charliepinilla777/SuperHot/discussions) | Comunidad |

### 👨‍💻 **Contacto**
- 📧 **Email**: contacto@superhot.com
- 💬 **Twitter**: [@SuperHotDev](https://twitter.com/SuperHotDev)
- 🎨 **Portfolio**: [superhot.dev](https://superhot.dev)

</div>

---

<div align="center">

## 🔥 **Super Hot - La plataforma más caliente para creadoras de contenido**

### ⭐ **Si te gusta el proyecto, ¡regálame una estrella!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/charliepinilla777/SuperHot?style=social)](https://github.com/charliepinilla777/SuperHot/stargazers)

---

**🚀 Hecho con ❤️, TypeScript y mucho café** ☕

</div>
