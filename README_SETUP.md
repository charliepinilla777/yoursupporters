# 🚀 Gilded Noir - Guía de Inicio Rápido

## Setup Inicial

### 1. Requisitos
- Node.js 18+
- npm o yarn
- Git

### 2. Instalación
```bash
# Clonar repo
git clone https://github.com/charliepinilla777/SuperHot.git
cd SuperHot

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La app estará disponible en: **http://localhost:5173**

---

## 📋 Flujo Principal (Demo)

### 1. Landing Page
- Abre `http://localhost:5173`
- Ves el welcome screen
- Botón pequeño de idioma abajo-derecha (ES/EN)

### 2. Explorar Creadoras
- Clic en "Entrar a Explorar"
- Busca por nombre o tags
- 3 creadoras demo: Luna Noir, Vesper Aurea, Morgana Velvet

### 3. Ver Perfil de Creadora
- Clic en "Ver" en cualquier creadora
- Ves el **botón 3D épico de suscripción** (switch style)
- Grid de posts (algunos bloqueados si no estás suscrita)

### 4. Suscribirse
- Clic en botón "ACTIVAR"
- Animación 3D + flicker
- Estado cambia a "✓ Suscrita"
- Chat se habilita

### 5. Chat
- Tab inferior "Inbox"
- Selecciona creadora
- Envía/recibe mensajes

### 6. Dashboard (Demo)
- Tab "Perfil/Dashboard"
- Cambiar rol: Fan / Creadora / Admin / Supervisor
- Cambiar verificación: Pending / Approved / Rejected
- Editar perfil público (bio, links)

---

## 🎨 Componentes Clave

| Componente | Ruta | Descripción |
|-----------|------|-------------|
| **GothicFrame** | `src/components/GothicFrame.tsx` | Marco gótico con ornamentos |
| **SubscribeButton** | `src/components/SubscribeButton.tsx` | Botón 3D épico |
| **BottomTabs** | `src/components/BottomTabs.tsx` | Navegación sticky |
| **LanguageSwitcher** | `src/components/LanguageSwitcher.tsx` | Selector ES/EN |
| **DemoSession** | `src/components/DemoSession.tsx` | Estado en localStorage |

---

## 🔧 Tecnologías

- **React 18** + TypeScript
- **Vite 5** (build tool)
- **React Router v6** (routing)
- **CSS vanilla** + variables (no Tailwind por ahora)

---

## 📱 Mobile-First

- Safe area padding (notch iPhone)
- Tap targets 44px+
- Bottom tab navigation sticky
- Responsive hasta desktop
- Skeleton loaders

---

## 🔐 Reglas del Producto

❌ Prohibido:
- Publicar teléfono/WhatsApp/Telegram
- Coordinar encuentros presenciales
- Promocionar escorting/prostitución

✅ Permitido:
- Instagram, X, Website (enlaces opcionales)
- Solo contenido digital

---

## 📂 Estructura Importante

```
src/
├── components/
│   ├── GothicFrame.tsx          # Marco base
│   ├── SubscribeButton.tsx      # Botón 3D
│   ├── BottomTabs.tsx           # Nav inferior
│   ├── DemoSession.tsx          # Estado
│   └── ...otros
├── pages/
│   ├── Landing.tsx
│   ├── Explore.tsx
│   ├── CreatorProfile.tsx
│   ├── Chat.tsx
│   └── CreatorDashboard.tsx
├── lib/
│   ├── api.ts                   # API demo
│   ├── policy.ts                # Validaciones
│   ├── supabase.ts              # Cliente (futuro)
│   └── i18n.ts                  # ES/EN
└── App.tsx                      # Rutas
```

---

## 🚀 Próximos Pasos

1. **Supabase Auth** (integración real de usuarios)
2. **Base de datos completa** (posts, suscripciones, mensajes)
3. **Upload de contenido** (fotos/videos a Storage)
4. **Chat real-time** (WebSocket)
5. **Stripe** (pagos reales)
6. **Admin panel** (verificaciones, reportes)

---

## 🐛 Troubleshooting

### Puerto 5173 en uso
```bash
npm run dev -- --port 5174
```

### Caché de npm
```bash
npm install --force
rm -rf node_modules package-lock.json
npm install
```

### Cambios no se ven
- Presiona `F5` en navegador
- Ctrl+Shift+Delete (limpiar caché)
- Abre DevTools → Aplicación → Storage → Limpiar localStorage

---

## 📞 Soporte

**GitHub:** https://github.com/charliepinilla777/SuperHot

Crear issue con:
- Descripción del problema
- Steps para reproducir
- Browser + OS

---

**¡Listo para desarrollo!** 🎉
