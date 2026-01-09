# 🏗️ Arquitectura Técnica - Gilded Noir

## Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    App.tsx                          │
│              (Router + Providers)                   │
└──────────────┬──────────────────────────────────────┘
               │
        ┌──────┴─────────┐
        │                │
   ┌────▼────┐      ┌───▼───────┐
   │  Pages  │      │Components │
   └────┬────┘      └───────────┘
        │
   ┌────┼────────────────┐
   │    │    │    │      │
┌──▼─┐ │ ┌──▼──┐ │ ┌──▼──┐ │ ┌──▼──┐ │ ┌──▼──────┐
│ L  │ │ │ Ex │ │ │ CP  │ │ │ Ch  │ │ │ CD      │
│ an │ │ │ pl │ │ │ ro  │ │ │ at  │ │ │ ash     │
│ di │ │ │ or │ │ │ file│ │ │     │ │ │ board   │
│ ng │ │ │ e  │ │ │ Pro │ │ │     │ │ │         │
│    │ │ │    │ │ │ f   │ │ │     │ │ │         │
└────┘ │ └────┘ │ └─────┘ │ └─────┘ │ └─────────┘
       └────────┴──────────┴─────────┴──────────────┘
              All Pages Use:
       ┌─────────────────────────────┐
       │   Global Components         │
       ├─────────────────────────────┤
       │ • GothicFrame               │
       │ • BottomTabs (sticky)       │
       │ • AppHeader                 │
       │ • DemoSession (context)     │
       │ • Loading skeletons         │
       └─────────────────────────────┘
```

---

## Flujo de Estado (Context)

```
DemoSession.tsx (Context Provider)
│
├── user: { id, username, role, verification_status }
│
├── subscriptions: [ { creatorId, since }... ]
│
├── blocklist: [ creatorId... ]
│
├── locale: 'es' | 'en'
│
└── Actions:
    ├── setRole()
    ├── setVerificationStatus()
    ├── subscribeTo()
    ├── unsubscribeFrom()
    ├── setLocale()
    └── ...
```

**Persistencia:** localStorage (`gilded_noir_demo_state_v1`)

---

## Flujo de Routing

```
BrowserRouter (src/main.tsx)
│
└── App.tsx
    │
    ├── Route "/"
    │   └── Landing
    │       ├── Hero + Welcome
    │       ├── Language Switcher (bottom-right, small)
    │       └── CTAs (Explore, Dashboard)
    │
    ├── Route "/explore"
    │   └── Explore
    │       ├── AppHeader
    │       ├── Search Input
    │       ├── Creator Cards (GothicFrame)
    │       └── BottomTabs
    │
    ├── Route "/creator/:id"
    │   └── CreatorProfile
    │       ├── AppHeader (creador name + badge)
    │       ├── Subscribe Button (3D epic switch)
    │       ├── Posts Grid (2 cols, GothicFrame)
    │       └── BottomTabs
    │
    ├── Route "/chat"
    │   └── Chat
    │       ├── AppHeader
    │       ├── Creator Selector
    │       ├── Messages (if subscribed)
    │       └── BottomTabs
    │
    ├── Route "/dashboard"
    │   └── CreatorDashboard
    │       ├── AppHeader
    │       ├── Role Selector (GothicFrame buttons)
    │       ├── Verification Status (GothicFrame buttons)
    │       ├── Profile Editor (bio, links)
    │       └── BottomTabs
    │
    └── fallback: 404
```

---

## Sistema de Diseño (CSS Architecture)

### Token Layer
```css
/* src/index.css */
:root {
  /* Color tokens (RGB in HSL space) */
  --bg: 11 11 15;           /* #0B0B0F */
  --surface: 20 22 27;      /* #14161B */
  --surface-2: 28 31 36;    /* #1C1F24 */
  --text: 230 232 238;      /* #E6E8EE */
  --muted: 167 171 180;     /* #A7ABB4 */
  --gold: 212 175 55;       /* #D4AF37 */
  --gold-soft: 230 200 110; /* #E6C86E */

  /* Layout tokens */
  --page-max: 520px;        /* Max width for mobile */
  --tabbar-h: 72px;         /* Bottom tabs height */
  --header-h: 56px;         /* Top header height */
  --radius: 16px;           /* Border radius base */
  --radius-sm: 12px;

  /* Shadows & effects */
  --shadow: 0 14px 40px rgba(0,0,0,0.55);
  --shadow-soft: 0 10px 30px rgba(0,0,0,0.38);
  --glow: 0 0 0 1px rgba(212,175,55,0.35), 0 0 18px rgba(212,175,55,0.18);
}
```

### Component Layer

```
GothicFrame (base)
  ├── Double border (outer + inner)
  ├── Corner ornaments (SVG)
  ├── Subtle glow on hover
  └── Shadow + highlight

├─ GothicCard (extends GothicFrame)
│   └── Used for: creator cards, post cards, modals
│
├─ SubscribeButton (epic 3D)
│   ├── Perspective 1000px
│   ├── 3D rotateX animation
│   ├── Flicker light effect
│   └── Gold gradient
│
├─ Button (.btn)
│   ├── .btn (dark default)
│   └── .btn--primary (gold)
│
├─ Input (.input)
│   ├── Dark background
│   ├── Thin gold border
│   └── Gold focus ring
│
├─ Badge (.badge)
│   ├── Inline chip
│   ├── Gold border
│   └── Dark background
│
└─ Divider (.divider)
    └── Thin muted gold line
```

### Utility Layer
```css
.app-shell              /* Full viewport container */
.screen                 /* Centered, max-width screen */
.safe-top/safe-bottom   /* safe-area-inset padding */
.muted                  /* Muted text color */
.skeleton               /* Loading placeholder */
.bottom-tabs            /* Sticky navigation */
.top-header             /* Sticky header */
```

---

## Data Flow Diagram

```
┌────────────────────┐
│   CreatorProfile   │
│   (component)      │
└────────┬───────────┘
         │
    ┌────▼────────────────┐
    │  useDemoSession()   │ ◄─── Retrieve state
    │  (context hook)     │
    └────┬──────────────┬─┘
         │              │
    ┌────▼────┐    ┌────▼──────────┐
    │ Redux   │    │ API call      │
    │ state   │    │ (mocked)      │
    │ update  │    │               │
    └────┬────┘    └────┬──────────┘
         │              │
    ┌────▼──────────────▼──┐
    │   localStorage        │
    │ (persist state)       │
    └───────────────────────┘

    ┌──────────────────────┐
    │   Re-render          │
    │   component with     │
    │   new state          │
    └──────────────────────┘
```

---

## Mobile-First Responsive Approach

### Viewport Sizes
- **Mobile:** 320px - 520px (optimized)
- **Tablet:** 521px - 1024px (maintained)
- **Desktop:** 1025px+ (full width, max 520px center)

### Layout Strategy
```css
/* Mobile first (default) */
.grid {
  grid-template-columns: 1fr;
}

/* Tablet + Desktop */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Safe Area (PWA)
```css
/* Notch/dynamic island (iPhone) */
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

---

## API Integration Points (Future)

### Current (Demo)
```typescript
api.getCreators()      // Returns mock data
api.subscribe()        // localStorage update
api.sendMessage()      // localStorage update
```

### Future (Supabase Real)
```typescript
// 1. Auth
supabase.auth.signUp()
supabase.auth.signIn()
supabase.auth.getSession()

// 2. Data
supabase.from('profiles').select()
supabase.from('posts').select()
supabase.from('subscriptions').select()

// 3. Real-time
supabase.channel('chat')
  .on('postgres_changes', ...)
  .subscribe()

// 4. Storage
supabase.storage.from('posts').upload()

// 5. Webhooks (Stripe)
Edge Function listening to payment_intent.succeeded
```

---

## Performance Considerations

### Bundling & Build
- Vite tree-shaking (removes unused code)
- Code splitting on routes (lazy loading)
- CSS minification
- Image optimization (future)

### Runtime
- Memoization on list renders (`useMemo`)
- Debounce search (`useEffect` cleanup)
- Virtual scrolling for long lists (future)
- Image lazy loading (future)

### Mobile
- Minimize JS bundle
- Defer non-critical CSS
- Use `preconnect` for external domains (future)
- Cache strategy with Service Worker (future)

---

## Security Architecture

### Client-Side (Current)
- localStorage (not for sensitive data)
- No API keys exposed (future: server-side only)
- Input validation (phone/WhatsApp blocking)
- XSS protection (React escapes by default)

### Server-Side (Future)
- JWT authentication
- Row Level Security (RLS) in Supabase
- Rate limiting on API endpoints
- Content moderation queue
- Audit logs for admin actions

---

## State Management (Simple Pattern)

### Why Context + localStorage (not Redux)
1. **Small app scale** (MVP, < 100 components)
2. **Simple state** (user, subscriptions, preferences)
3. **No complex async** (API calls are demo'd)
4. **Performance OK** (no deep nesting)

### If scaling:
```typescript
// Future: Redux Toolkit or Zustand
const { user, subscriptions } = useAppStore()
```

---

## File Organization Best Practices

### Component Structure
```typescript
// ✅ Good
components/
├── GothicFrame.tsx         // Export default + types
├── SubscribeButton.tsx
└── index.ts                // Re-exports for convenience

// Pages
pages/
├── Landing.tsx             // Lazy loadable
├── CreatorProfile.tsx
└── index.ts
```

### Naming
- `src/lib/api.ts` → API layer (mock or real)
- `src/lib/policy.ts` → Business logic (validation)
- `src/lib/supabase.ts` → Service client
- `src/components/` → UI components only
- `src/pages/` → Screen components
- `src/contexts/` → Context providers

---

## Testing Strategy (Planned)

### Unit Tests (jest + React Testing Library)
```typescript
describe('GothicFrame', () => {
  it('renders with double border', () => {
    render(<GothicFrame>Content</GothicFrame>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
```

### E2E Tests (Cypress/Playwright)
```typescript
it('user can subscribe to creator', () => {
  cy.visit('/creator/c1')
  cy.get('[data-testid="subscribe-btn"]').click()
  cy.contains('✓ Suscrita').should('be.visible')
})
```

---

## Deployment Architecture (Future)

```
GitHub (source)
  │
  ├─► Vercel (frontend)
  │   ├── Auto-deploy on push
  │   ├── Preview URLs
  │   └── Global CDN
  │
  └─► Supabase Cloud (backend)
      ├── PostgreSQL DB
      ├── Auth + Storage
      ├── Edge Functions
      └── Real-time subscriptions
```

---

## Monitoring & Analytics (Future)

```typescript
// Events to track
events.track('creator_subscribed', { creatorId, price })
events.track('message_sent', { conversationId })
events.track('content_viewed', { postId, duration })

// Errors
sentry.captureException(error, { context: 'uploadContent' })
```

---

**Architecture Version:** 1.0  
**Last Updated:** 2026-01-09  
**Status:** MVP Ready for Integration
