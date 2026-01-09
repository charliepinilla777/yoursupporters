# 📱 Gilded Noir - Plataforma de Suscripción para Creadoras de Contenido

## 🎯 Descripción del Proyecto

**Gilded Noir** es una plataforma tipo **OnlyFans** para creadoras de contenido digital (fotos/videos) con chat in-app y sistema de suscripción. Implementada como **PWA mobile-first** con diseño **Gothic Gold Frame**.

### Características Principales
- ✅ Exploración de creadoras con búsqueda por nombre/tags
- ✅ Sistema de suscripciones mensuales ($5/mes)
- ✅ Chat 1:1 entre fans y creadoras
- ✅ Panel de creadora (upload, estadísticas)
- ✅ Verificación 18+ requerida para publicar
- ✅ Diseño mobile-first responsive
- ✅ Botón de suscripción 3D épico (switch style)
- ✅ Selector de idioma (ES/EN)

### Reglas Estrictas del Producto
- 🚫 **Prohibido** coordinar encuentros/servicios sexuales presenciales
- 🚫 **Prohibido** publicar teléfono/WhatsApp/Telegram/contacto directo
- ✅ Solo permitir enlaces sociales opcionales: Instagram, X, Sitio web
- ✅ Creadoras deben ser 18+ con verificación aprobada antes de publicar

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Routing** | React Router v6 |
| **Estilos** | CSS vanilla + Tailwind (opcional) |
| **Backend** | Node.js (demo, sin backend integrado aún) |
| **BD** | Supabase (PostgreSQL) - configuración pendiente |
| **Auth** | Supabase Auth - implementación pendiente |
| **Storage** | Supabase Storage - para fotos/videos |
| **Pagos** | Stripe (integración pendiente) |
| **Real-time** | Supabase Realtime para chat (pendiente) |
| **PWA** | Vite + manifest básico |

---

## 📂 Estructura de Carpetas

```
gilded-noir-work/
├── src/
│   ├── components/
│   │   ├── AppHeader.tsx           # Header superior con título y badge
│   │   ├── BottomTabs.tsx          # Navegación inferior (tabs sticky)
│   │   ├── DemoSession.tsx         # Context/hook de sesión demo (localStorage)
│   │   ├── GothicFrame.tsx         # Marco gótico con ornamentos (componente base)
│   │   ├── LanguageSwitcher.tsx    # Selector ES/EN (flotante en Landing)
│   │   ├── SubscribeButton.tsx     # Botón 3D épico de suscripción
│   │   ├── Loading.tsx             # Componente de carga
│   │   ├── icons.tsx               # Íconos SVG (compass, star, chat, user)
│   │   └── Loading.css             # Estilos de carga
│   │
│   ├── pages/
│   │   ├── Landing.tsx             # Página inicial (welcome + language switcher)
│   │   ├── Explore.tsx             # Explorar creadoras (búsqueda + listado)
│   │   ├── CreatorProfile.tsx      # Perfil de creadora (grid de posts + botón suscripción)
│   │   ├── Chat.tsx                # Chat 1:1 (demo con localStorage)
│   │   └── CreatorDashboard.tsx    # Dashboard creadora (perfil, rol, verificación)
│   │
│   ├── lib/
│   │   ├── api.ts                  # API demo (sin backend real aún)
│   │   ├── supabase.ts             # Cliente Supabase (inicialización)
│   │   ├── policy.ts               # Validación de reglas (no WhatsApp, teléfonos, etc.)
│   │   └── i18n.ts                 # Mensajes ES/EN
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx         # Contexto de autenticación (pendiente integración real)
│   │
│   ├── hooks/
│   │   └── useLoading.ts           # Hook para loading state
│   │
│   ├── App.tsx                     # Componente raíz (routes + providers)
│   ├── main.tsx                    # Entry point React
│   └── index.css                   # Estilos globales (tokens CSS, utilidades)
│
├── public/
│   ├── vite.svg
│   └── (PWA icons/manifest aquí)
│
├── backend/
│   ├── src/
│   │   ├── index.ts                # Entry point servidor (demo/no integrado)
│   │   ├── config/
│   │   │   └── database.ts         # Conexión BD (pendiente)
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Content.ts
│   │   │   ├── Subscription.ts
│   │   │   └── ChatMessage.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── creators.ts
│   │   │   ├── subscriptions.ts
│   │   │   ├── content.ts
│   │   │   ├── chat.ts
│   │   │   └── users.ts
│   │   └── socket/
│   │       └── chatHandlers.ts     # Socket.io handlers (pendiente)
│   ├── package.json
│   └── tsconfig.json
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── index.html
└── DOCUMENTATION.md                # Este archivo
```

---

## 🎨 Sistema de Diseño (Gothic Gold)

### Tokens CSS (variables globales)
Definidas en `src/index.css`:

```css
--bg: 11 11 15;              /* #0B0B0F - Negro profundo */
--surface: 20 22 27;         /* #14161B - Superficie primaria */
--surface-2: 28 31 36;       /* #1C1F24 - Superficie secundaria */
--text: 230 232 238;         /* #E6E8EE - Texto principal */
--muted: 167 171 180;        /* #A7ABB4 - Texto mutado */
--gold: 212 175 55;          /* #D4AF37 - Oro primario */
--gold-soft: 230 200 110;    /* #E6C86E - Oro suave */
```

### Componentes Base

#### 1. **GothicFrame** (`src/components/GothicFrame.tsx`)
Marco gótico con:
- Doble borde (outer + inner)
- Ornamentos SVG en las 4 esquinas
- Glow sutil al hover
- Shadow y highlight minimalistas

**Uso:**
```tsx
<GothicFrame as="article">
  <div>Contenido aquí</div>
</GothicFrame>
```

#### 2. **SubscribeButton** (`src/components/SubscribeButton.tsx`)
Botón 3D épico con:
- Efecto 3D con perspectiva (rotateX)
- Brillo dorado al activar
- Animación de flicker
- Estados: default, hovering, clicked, subscribed

**Uso:**
```tsx
<SubscribeButton 
  creatorName="Luna Noir"
  price={5}
  onSubscribe={() => subscribeTo('c1')}
  isSubscribed={subscribed}
/>
```

#### 3. **BottomTabs** (`src/components/BottomTabs.tsx`)
Navegación sticky abajo con 4 tabs:
- Explorar (brújula)
- Suscripciones (estrella)
- Inbox (chat)
- Perfil/Dashboard (usuario)

**Role-based:**
- Fan: Explorar / Suscripciones / Inbox / Perfil
- Creador: Explorar / Suscriptores / Inbox / Dashboard
- Admin: Igual que fan + acceso a Admin desde menú

---

## 🔐 Sistema de Sesión (Demo)

**Archivo:** `src/components/DemoSession.tsx`

### Datos en localStorage
```typescript
type DemoState = {
  locale: 'es' | 'en'
  user: {
    id: string
    username: string
    role: 'fan' | 'model' | 'admin' | 'supervisor'
    verification_status: 'pending' | 'approved' | 'rejected'
  }
  subscriptions: { creatorId: string, since: string }[]
  blocklist: string[]
}
```

### Hook `useDemoSession`
```tsx
const { 
  user, 
  setRole, 
  setVerificationStatus,
  subscriptions,
  isSubscribedTo,
  subscribeTo,
  unsubscribeFrom,
  locale,
  setLocale
} = useDemoSession()
```

---

## 📡 API Demo (`src/lib/api.ts`)

Todas las funciones retornan **Promises resueltas** con datos mockeados (sin backend real).

### Creadoras Demo
```typescript
const DEMO_CREATORS = [
  {
    id: 'c1',
    name: 'Luna Noir',
    followers: 1200,
    tags: ['gótico', 'minimal', 'foto'],
    verificationStatus: 'approved',
    subscriptionPrice: 5
  },
  // ...más creadoras
]
```

### Funciones disponibles
```typescript
api.getCreators({ search, limit }) // Retorna { data: Creator[] }
api.getCreator(creatorId)           // Retorna Creator o null
api.subscribe(creatorId)            // Demo
api.unsubscribe(creatorId)          // Demo
api.getMySubscriptions()            // Retorna { data: [] }
api.getChatHistory(creatorId)       // Retorna { data: [] }
api.sendMessage(data)               // Demo
```

---

## 🛣️ Rutas de la Aplicación

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Landing | Página inicial con selector de idioma |
| `/explore` | Explore | Listado de creadoras con búsqueda |
| `/creator/:id` | CreatorProfile | Perfil de creadora + grid de posts + botón suscripción |
| `/chat` | Chat | Chat 1:1 con creadoras suscritas |
| `/dashboard` | CreatorDashboard | Panel para cambiar rol, verificación, perfil público |

### Bottom Tabs (Navegación)
- **Explorar** → `/explore`
- **Suscripciones** → `/dashboard?tab=subs` (o similar)
- **Inbox** → `/chat`
- **Perfil/Dashboard** → `/dashboard`

---

## 🎯 Validaciones y Reglas (policy.ts)

### `containsForbiddenContact(text: string): boolean`
Verifica si el texto contiene:
- Números de teléfono
- "whatsapp", "wa.me"
- "telegram", "t.me"
- "escort", "prostitución"
- "en persona", "presencial"
- Otras palabras clave prohibidas

### `validateSocialUrl(url: string): { ok: boolean, error?: string }`
Valida que un enlace sea:
- Una URL válida (http:// o https://)
- NO sea un teléfono
- NO contenga palabras prohibidas

---

## 📱 Características Mobile-First

### Safe Area & Responsive
```css
.safe-top { padding-top: env(safe-area-inset-top); }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }

.screen {
  max-width: 520px;
  margin: 0 auto;
  padding: 16px 16px calc(72px + 18px + env(safe-area-inset-bottom));
}
```

### Tap Targets (44px+)
Todos los botones e inputs tienen `min-height: 44px` para accesibilidad táctil.

### Bottom Tab Bar Sticky
```css
.bottom-tabs {
  position: fixed;
  bottom: 0;
  height: var(--tabbar-h);  /* 72px */
  z-index: 30;
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Skeleton Loaders
```tsx
<div className="skeleton" style={{ height: '140px' }} />
```

---

## 🔄 Flujos Principales

### 1. **Explorar Creadoras**
```
Landing → "Entrar a Explorar" 
  ↓
Explore (búsqueda por nombre/tags)
  ↓
Click "Ver" 
  ↓
CreatorProfile (grid de posts + botón suscripción)
```

### 2. **Suscribirse**
```
CreatorProfile (no suscrita)
  ↓
Click botón "ACTIVAR" (3D switch)
  ↓
Animación 3D + flicker
  ↓
Estado cambia a "✓ Suscrita"
  ↓
Chat habilitado
```

### 3. **Chat**
```
CreatorProfile
  ↓
Click "💬 Enviar mensaje"
  ↓
Chat (si está suscrita)
  ↓
Seleccionar creadora
  ↓
Enviar/recibir mensajes
```

### 4. **Dashboard Creadora**
```
Dashboard
  ↓
Cambiar rol a "Creadora"
  ↓
Cambiar verificación a "approved"
  ↓
Editar perfil público (bio, links)
  ↓
Botón "Guardar"
```

---

## 🚀 Próximos Pasos (Integración Real)

### Fase 1: Supabase Auth (Semana 1)
- [ ] Reemplazar `DemoSession` con autenticación real
- [ ] Crear tabla `profiles` en Supabase
- [ ] Implementar Login/Signup
- [ ] JWT tokens en localStorage

### Fase 2: Base de Datos Completa (Semana 2)
- [ ] Crear esquema SQL (posts, subscriptions, messages, etc.)
- [ ] Row Level Security (RLS)
- [ ] Índices de performance

### Fase 3: Upload de Contenido (Semana 2)
- [ ] Integrar Supabase Storage
- [ ] Dashboard de upload (fotos/videos)
- [ ] Generar thumbnails

### Fase 4: Chat Real-time (Semana 3)
- [ ] Supabase Realtime (Postgres Changes)
- [ ] WebSocket listeners
- [ ] Mensajes persist en BD

### Fase 5: Pagos (Stripe) (Semana 3-4)
- [ ] Edge Function para webhooks
- [ ] Checkout flow
- [ ] Verificación de suscripción activa

### Fase 6: Admin Panel (Semana 4)
- [ ] Cola de verificaciones (18+)
- [ ] Gestión de reportes
- [ ] Estadísticas de ingresos

### Fase 7: Deployment (Semana 4-5)
- [ ] Vercel (frontend)
- [ ] Supabase Cloud (backend)
- [ ] Custom domain
- [ ] SSL/HTTPS
- [ ] PWA manifest + icons

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev          # Inicia servidor Vite (http://localhost:5173)
npm run build        # Build para producción
npm run preview      # Preview de build
```

### Git
```bash
git add -A
git commit -m "feat: descripción"
git push origin main
git pull origin main # Actualizar cambios
```

### Testing (futuro)
```bash
npm run test         # Test suite (pendiente)
npm run test:e2e     # E2E tests (pendiente)
```

---

## 📊 Estructura de Datos

### Usuario (DemoState)
```typescript
{
  id: string;
  username: string;
  role: 'fan' | 'model' | 'admin' | 'supervisor';
  verification_status: 'pending' | 'approved' | 'rejected';
}
```

### Creadora (Creator)
```typescript
{
  id: string;
  name: string;
  username: string;
  profile: {
    bio?: string;
    instagram?: string;
    x?: string;
    website?: string;
  };
  verificationStatus: 'pending' | 'approved' | 'rejected';
  subscriptionPrice: number;
  followers: number;
  tags?: string[];
}
```

### Suscripción
```typescript
{
  fanId: string;
  creatorId: string;
  status: 'active' | 'cancelled' | 'paused';
  startDate: string;
  renewsAt: string;
  price: number;
}
```

### Mensaje de Chat
```typescript
{
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}
```

---

## 🔒 Seguridad & Compliance

### Product Rules (Implementadas en UX/validation)
- ✅ No permitir posting de teléfono/WhatsApp/Telegram (validado en `policy.ts`)
- ✅ No coordinar encuentros presenciales (copy + validación)
- ✅ Creadoras 18+ con verificación requerida (gating en dashboard)
- ✅ Solo links sociales opcionales: Instagram, X, Website

### Future (Supabase)
- [ ] RLS para datos sensibles
- [ ] JWT scoped tokens
- [ ] Rate limiting en API
- [ ] Audit logs
- [ ] GDPR compliance

---

## 📝 Notas de Desarrollo

### Demo State vs Real
- **Ahora:** Todo en localStorage (DemoSession)
- **Futuro:** Reemplazar con Supabase Auth + API real

### API Mocking
- **Ahora:** `api.ts` retorna Promises con datos hardcodeados
- **Futuro:** Llamadas reales a Supabase + backend

### Estilos
- **Sistema:** CSS variables + inline styles en React (sin Tailwind yet)
- **Componentes:** GothicFrame + utilidades base (btn, input, badge, etc.)
- **Responsive:** Mobile-first con breakpoints básicos

---

## 🙋 Contacto & Soporte

**Repositorio:** https://github.com/charliepinilla777/SuperHot

**Issues/Bugs:** Crear issue en GitHub con:
- Descripción del problema
- Steps para reproducir
- Screenshot/video si aplica
- Browser + OS

---

**Última actualización:** 2026-01-09  
**Versión:** 1.0.0-demo  
**Estado:** MVP funcional, listo para integración real de Supabase/Stripe
