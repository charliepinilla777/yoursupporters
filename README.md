# Super Hot - Plataforma de Suscripciones para Creadoras

Una aplicación moderna y elegante para creadoras de contenido con sistema de suscripciones.

## 🚀 Características

### Frontend (React + TypeScript + Vite)
- **Diseño Gótico Moderno**: UI elegante con botones animados y efectos visuales
- **Botones con Gradiente Arcoíris**: Efectos de estrellas y glow
- **Sistema de Autenticación**: Login, registro y gestión de sesiones
- **Navegación Responsive**: Bottom tabs y diseño móvil-first
- **Multiidioma**: Switcher de idiomas (ES/EN)
- **Exploración de Creadoras**: Búsqueda y filtrado
- **Perfiles de Creadoras**: Información detallada y suscripciones

### Backend (Node.js + Express + TypeScript)
- **API RESTful**: Endpoints completos para gestión de contenido
- **Autenticación JWT**: Tokens seguros y middleware de protección
- **Base de Datos MongoDB**: Modelos de usuarios, contenido y suscripciones
- **Sistema de Suscripciones**: Gestión completa de pagos y accesos
- **Chat en Tiempo Real**: Socket.IO para mensajería instantánea
- **Upload de Archivos**: Integración con Cloudinary
- **Validaciones**: Express-validator para datos seguros
- **Rate Limiting**: Protección contra abusos

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite 5** para desarrollo rápido
- **React Router DOM 6** para navegación
- **CSS3** con animaciones personalizadas
- **PostCSS** para procesamiento de estilos

### Backend
- **Node.js** con TypeScript
- **Express.js** framework web
- **MongoDB** con Mongoose ODM
- **JWT** para autenticación
- **Socket.IO** para comunicación real-time
- **Cloudinary** para almacenamiento
- **Nodemailer** para notificaciones

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- MongoDB
- Git

### Instalar dependencias del frontend
```bash
npm install
```

### Instalar dependencias del backend
```bash
cd backend
npm install
```

### Configurar variables de entorno
```bash
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales
```

## 🚀 Ejecución

### Iniciar frontend
```bash
npm run dev
```

### Iniciar backend (versión demo)
```bash
cd backend
npm run dev-demo
```

### Iniciar backend (con MongoDB)
```bash
cd backend
npm run dev
```

## 📱 Acceso a la Aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3002
- **Health Check**: http://localhost:3002/api/health

## 🔥 Características Destacadas

### Diseño Visual
- **Botones Animados**: Gradiente arcoíris con efectos de estrellas
- **Fondo Elegante**: Patrón SVG con temática gótica
- **Efectos Glow**: Animaciones suaves y modernas
- **Responsive Design**: Perfecto para móviles y desktop

### Funcionalidades
- **Registro y Login**: Sistema completo de autenticación
- **Exploración**: Buscar y descubrir creadoras
- **Suscripciones**: Gestión de pagos y contenido premium
- **Chat**: Mensajería en tiempo real entre fans y creadoras
- **Perfiles**: Información detallada y personalización
- **Dashboard**: Panel de control para creadoras

## 📁 Estructura del Proyecto

```
super-hot/
├── src/
│   ├── components/          # Componentes React
│   ├── contexts/           # Contextos de React
│   ├── lib/               # Utilidades y API
│   ├── pages/              # Páginas de la app
│   └── main.tsx           # Punto de entrada
├── backend/
│   ├── src/
│   │   ├── config/         # Configuración
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Rutas API
│   │   ├── socket/         # Handlers de Socket.IO
│   │   └── index.ts        # Servidor principal
│   └── package.json
└── package.json
```

## 🎨 Personalización

### Colores y Tema
Los colores están definidos en variables CSS en `src/index.css`:
- `--gold`: Dorado principal (#D4AF37)
- `--surface-*`: Tonos de superficie
- `--text`: Colores de texto

### Animaciones
Las animaciones de botones usan keyframes CSS personalizados:
- `gradient_301`: Animación de gradiente arcoíris
- Efectos de estrellas y glow

## 🔐 Seguridad

- **JWT Tokens**: Autenticación segura
- **Rate Limiting**: Protección contra abusos
- **Input Validation**: Validación de datos
- **CORS**: Configuración segura de orígenes
- **Helmet**: Headers de seguridad

## 📈 Escalabilidad

- **MongoDB**: Base de datos escalable
- **Redis**: Para caché y sesiones (opcional)
- **Cloudinary**: CDN para archivos
- **Docker**: Contenerización fácil

## 🤝 Contribución

1. Fork del proyecto
2. Crear feature branch
3. Hacer commit de cambios
4. Push al branch
5. Crear Pull Request

## 📄 Licencia

MIT License - Ver archivo LICENSE para detalles

## 🔥 Super Hot - La plataforma más caliente para creadoras de contenido

---

**Desarrollado con ❤️ y TypeScript**
