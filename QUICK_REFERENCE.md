# ⚡ Quick Reference - Gilded Noir v1.0

## 🎯 En 30 segundos

**Gilded Noir** es una plataforma de suscripción para creadoras de contenido digital (fotos/videos) + chat in-app. Diseño **mobile-first PWA** con **Gothic Gold Frames** globales (negro #0B0B0F + oro #D4AF37).

---

## 🚀 Empezar

```bash
cd C:\Users\Carlos\Desktop\gilded-noir
npm install
npm run dev
# → http://localhost:5173
```

---

## 📱 Flujo Demo (2 minutos)

1. **Landing** → "Entrar a Explorar"
2. **Explore** → Buscar "luna" → Click "Ver"
3. **CreatorProfile** → Click botón dorado 3D "ACTIVAR"
4. **Chat** → Enviar mensaje
5. **Dashboard** → Cambiar rol a "Creadora" → cambiar verificación a "Approved"

**Prueba idioma:** Landing → botón abajo-derecha (ES/EN)

---

## 🏗️ Estructura Rápida

| Carpeta | Qué contiene |
|---------|-------------|
| `src/components/` | Componentes base (GothicFrame, SubscribeButton, BottomTabs) |
| `src/pages/` | 5 páginas principales |
| `src/lib/` | API demo, validaciones, i18n, Supabase client |
| `src/contexts/` | DemoSession (estado en localStorage) |
| `src/index.css` | Tema global + CSS variables |

---

## 🎨 Componentes Clave

### GothicFrame (en TODAS partes)
Marco doble + ornamentos góticos + glow sutil
```tsx
<GothicFrame as="article">
  Cualquier contenido aquí
</GothicFrame>
```

### SubscribeButton (botón 3D épico)
```tsx
<SubscribeButton 
  creatorName="Luna Noir"
  price={5}
  onSubscribe={() => subscribeTo('c1')}
  isSubscribed={subscribed}
/>
```

### BottomTabs (navegación sticky)
- Explorar (brújula)
- Suscripciones (estrella)
- Inbox (chat)
- Perfil/Dashboard (usuario)

---

## 🔧 Rutas

| Ruta | Qué es |
|------|--------|
| `/` | Landing + selector idioma |
| `/explore` | Listado de creadoras |
| `/creator/:id` | Perfil + botón suscripción |
| `/chat` | Chat 1:1 |
| `/dashboard` | Panel creadora (rol, verificación, perfil) |

---

## 🎯 Reglas del Producto (Implementadas)

❌ **Prohibido (validado):**
- Teléfono/WhatsApp/Telegram en campos públicos
- Coordinar encuentros presenciales
- Promover prostitución/escorting

✅ **Permitido:**
- Instagram, X, Website (enlaces validados)
- Solo contenido digital

🔒 **Gating:**
- Solo creadores con `verification_status="approved"` pueden publicar
- Solo fans suscritos pueden chatear

---

## 📊 Estado Demo

**Guardado en `localStorage`:**
```javascript
{
  user: { role: 'fan', verification_status: 'pending', ... },
  subscriptions: [],
  blocklist: [],
  locale: 'es'
}
```

**Cambiar en dashboard:**
- Rol: Fan / Creadora / Admin / Supervisor
- Verificación: Pending / Approved / Rejected

---

## 🎨 Tema Colors

```
--bg:        #0B0B0F (negro profundo)
--surface:   #14161B (superficie)
--surface-2: #1C1F24 (superficie alt)
--text:      #E6E8EE (texto)
--muted:     #A7ABB4 (texto atenuado)
--gold:      #D4AF37 (oro primario)
--gold-soft: #E6C86E (oro suave)
```

---

## 📚 Documentación

| Doc | Lee primero si... |
|-----|-----------------|
| **README_SETUP.md** | Necesitas instalar y arrancar |
| **DOCUMENTATION.md** | Quieres entender toda la arquitectura |
| **ARCHITECTURE.md** | Te interesa el diagrama de componentes |
| **ROADMAP.md** | Quieres ver v1.1, v1.2, ... hasta v2.0 |
| **PROJECT_SUMMARY.md** | Necesitas un resumen ejecutivo |

---

## 🔄 Próximos Pasos (v1.1+)

```
v1.0 (HECHO)         v1.1              v1.2           v1.3           v1.4
├─ MVP demo    ────► Supabase Auth ──► Upload ──────► Chat RT ────► Stripe
└─ GothicFrame       ├─ Auth real      ├─ Storage     ├─ WebSocket   ├─ Checkout
                     ├─ JWT tokens     ├─ Thumbnails  └─ Messages    └─ Webhooks
                     └─ Profile DB     └─ Posts table
```

Ver **ROADMAP.md** para sprints detallados.

---

## 🐛 Troubleshooting

### Puerto 5173 en uso
```bash
npm run dev -- --port 5174
```

### Limpiar cache
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### localStorage corrupted
- Abre DevTools (F12)
- Application → Storage → Local Storage
- Clic derecho → Clear All

---

## 📞 GitHub

**Repo:** https://github.com/charliepinilla777/SuperHot

**Clonar:**
```bash
git clone https://github.com/charliepinilla777/SuperHot.git
cd SuperHot
npm install
npm run dev
```

---

## ✨ Qué hace especial

✅ **Estética única:** GothicFrame + oro en todo (no template genérico)  
✅ **Mobile-first:** se siente como app nativa  
✅ **Bien documentado:** 4 docs + código limpio  
✅ **Listo para escala:** arquitectura preparada para Supabase + Stripe  
✅ **Reglas del producto:** validaciones en lugar de confiar en usuarios  

---

## 🚀 Estado Actual

| Item | Estado |
|------|--------|
| MVP funcional | ✅ |
| Design system | ✅ |
| Mobile-first | ✅ |
| Bottom tabs | ✅ |
| i18n (es/en) | ✅ |
| Documentación | ✅ |
| Supabase Auth | ⏳ v1.1 |
| Stripe payments | ⏳ v1.4 |
| Live streaming | ⏳ v2.0 |

---

**¡Listo para usar!** 🎉

Abre http://localhost:5173 y explora. Luego ve **DOCUMENTATION.md** si quieres profundizar.
