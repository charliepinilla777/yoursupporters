# 🗺️ Roadmap - Gilded Noir

## Versiones

### ✅ v1.0 - MVP (ACTUAL)
**Estado:** Listo en producción  
**Fecha:** 2026-01-09

**Features completadas:**
- ✅ Exploración de creadoras (búsqueda + listado)
- ✅ Perfil de creadora (posts grid + botón suscripción)
- ✅ Sistema de suscripciones (demo en localStorage)
- ✅ Chat 1:1 (demo)
- ✅ Dashboard creadora (cambiar rol, verificación, perfil)
- ✅ Diseño mobile-first responsive
- ✅ Botón 3D épico de suscripción
- ✅ Sistema GothicFrame global
- ✅ Selector de idioma ES/EN
- ✅ Validaciones de producto (no WhatsApp/teléfono, etc.)

**Tech stack:**
- React 18 + TypeScript
- Vite 5
- React Router v6
- CSS vanilla + variables
- localStorage para estado

---

### 🔄 v1.1 - Supabase Integration (Semana 1-2)
**Prioridad:** CRÍTICA  
**Estimado:** 40 horas

#### Sprint 1.1.1: Authentication
- [ ] Crear tabla `profiles` en Supabase
- [ ] Reemplazar `DemoSession` con autenticación real (JWT)
- [ ] Implementar pantalla Login
- [ ] Implementar pantalla Signup (con rol selector)
- [ ] Email verification (optional)
- [ ] Password reset flow

**Commits esperados:**
```
feat: Supabase Auth setup + JWT tokens
feat: LoginPage component
feat: SignupPage with role selector
feat: Protected routes middleware
```

#### Sprint 1.1.2: User Profiles & Roles
- [ ] Migrar user state a tabla `profiles`
- [ ] Row Level Security (RLS) policies
- [ ] Role-based access control (RBAC)
- [ ] Creator approval workflow
  - [ ] Tabla `creator_verifications`
  - [ ] Document upload & storage
  - [ ] Admin queue to approve/reject

**Commits esperados:**
```
feat: Profiles table + RLS policies
feat: Creator verification flow
feat: AdminVerificationQueue page
```

---

### 🎬 v1.2 - Content Management (Semana 3)
**Prioridad:** ALTA  
**Estimado:** 35 horas

#### Sprint 1.2.1: Upload & Storage
- [ ] Integrar Supabase Storage (buckets: posts, avatars)
- [ ] Crear CreatorDashboard Upload UI
- [ ] Photo upload (JPEG/PNG, max 50MB)
- [ ] Video upload (MP4/WebM, max 500MB)
- [ ] Thumbnail generation para videos
- [ ] Image optimization & CDN

**Commits esperados:**
```
feat: Supabase Storage integration
feat: PhotoUploader component
feat: VideoUploader with thumbnail preview
feat: Media management dashboard
```

#### Sprint 1.2.2: Posts & Feed
- [ ] Tabla `posts` con fields (title, description, media_type, locked, price)
- [ ] CreatorProfile → fetch creator's posts
- [ ] Explore → paginated feed
- [ ] Locked content blur (paywall)
- [ ] Post detail modal/page

**Commits esperados:**
```
feat: Posts table + queries
feat: Feed pagination
feat: Paywall blur overlay
```

---

### 💬 v1.3 - Real-time Chat (Semana 4)
**Prioridad:** ALTA  
**Estimado:** 30 horas

#### Sprint 1.3.1: Chat Infrastructure
- [ ] Tabla `messages` (sender, receiver, content, isRead, timestamp)
- [ ] Supabase Realtime subscriptions (postgres_changes)
- [ ] WebSocket connection management
- [ ] Conversation list (last message preview)
- [ ] Message history fetch

**Commits esperados:**
```
feat: Messages table + RLS
feat: Realtime chat listeners (Supabase)
feat: ConversationList component
feat: MessageHistory pagination
```

#### Sprint 1.3.2: Chat UX Polish
- [ ] Message compose UI (textarea + send button)
- [ ] Typing indicator (optional)
- [ ] Message reactions (optional)
- [ ] File attachments in chat (future)
- [ ] Read receipts
- [ ] Block/report from chat

**Commits esperados:**
```
feat: Chat message compose
feat: Read receipts
feat: Block user from chat
```

---

### 💳 v1.4 - Stripe Payments (Semana 5)
**Prioridad:** CRÍTICA  
**Estimado:** 40 horas

#### Sprint 1.4.1: Stripe Setup
- [ ] Stripe account (test mode)
- [ ] Supabase Edge Functions para webhooks
- [ ] Stripe API keys en `.env`
- [ ] Customer creation en Stripe
- [ ] Subscription product setup

**Commits esperados:**
```
feat: Stripe integration skeleton
feat: Edge Functions for payment webhooks
```

#### Sprint 1.4.2: Checkout Flow
- [ ] Checkout button en CreatorProfile
- [ ] Stripe Hosted Checkout (recommended)
- [ ] Success/cancel pages
- [ ] Webhook: `payment_intent.succeeded` → insert subscription
- [ ] Webhook: `invoice.payment_failed` → mark as failed

**Commits esperados:**
```
feat: StripeCheckout component
feat: CheckoutSuccess page
feat: Payment webhooks handler
```

#### Sprint 1.4.3: Subscription Management
- [ ] Tabla `subscriptions` (fan_id, creator_id, stripe_sub_id, status)
- [ ] RLS: only subscriber can access creator's locked posts
- [ ] Cancel subscription UI
- [ ] Webhook: `customer.subscription.deleted` → update status
- [ ] Subscription status indicators

**Commits esperados:**
```
feat: Subscriptions table + access control
feat: CancelSubscription flow
```

---

### 🛡️ v1.5 - Moderation & Admin (Semana 6)
**Prioridad:** MEDIA  
**Estimado:** 25 horas

#### Sprint 1.5.1: Reporting System
- [ ] Report button en creator cards/profiles/posts
- [ ] Tabla `reports` (reason, status, created_at)
- [ ] Report modal (predefined reasons)
- [ ] Admin ReportQueue page
- [ ] Resolve/dismiss report action

**Commits esperados:**
```
feat: Report system + table
feat: ReportModal component
feat: AdminReportQueue page
```

#### Sprint 1.5.2: Content Moderation
- [ ] Flag inappropriate content (admin action)
- [ ] Suspend creator (temporary)
- [ ] Delete post/profile
- [ ] Audit log

**Commits esperados:**
```
feat: ContentModeration actions
feat: AuditLog table + view
```

---

### 📊 v1.6 - Analytics & Earnings (Semana 7)
**Prioridad:** MEDIA  
**Estimado:** 20 horas

#### Sprint 1.6.1: Creator Dashboard Stats
- [ ] Total subscribers
- [ ] Monthly recurring revenue (MRR)
- [ ] Top posts (views/sales)
- [ ] Subscriber growth chart
- [ ] Earnings history table

**Commits esperados:**
```
feat: CreatorStats dashboard
feat: Earnings analytics
```

#### Sprint 1.6.2: Payout
- [ ] Monthly payout calculation
- [ ] Stripe Connect (creator bank account)
- [ ] Payout request flow
- [ ] Payout history

**Commits esperados:**
```
feat: Stripe Connect integration
feat: PayoutRequest flow
```

---

### 🚀 v2.0 - Scale & Polish (Mes 2-3)
**Prioridad:** BAJA (POST-MVP)  
**Estimado:** 60+ horas

#### Features
- [ ] **Live streaming** (RTMP + HLS)
- [ ] **Tipping/donations** (uno-off payments)
- [ ] **Wishlist** (fans save posts)
- [ ] **Notifications** (in-app + email + push)
- [ ] **Creator collabs** (collaborate posts)
- [ ] **DM groups** (group chats)
- [ ] **Referral program** (bonus for invites)
- [ ] **Advanced search** (filters, sort)
- [ ] **Creator analytics API** (export)
- [ ] **Mobile app** (React Native o Flutter)

#### Infrastructure
- [ ] **Performance**: CDN, caching, DB indexing
- [ ] **Scalability**: horizontal scaling, load balancing
- [ ] **Security**: penetration testing, compliance (GDPR)
- [ ] **Testing**: E2E, unit tests, integration tests
- [ ] **Observability**: monitoring, logging, error tracking

---

## Timeline Visual

```
2026-01-09 (Now)
    │
    ├─► v1.0 MVP ✅ [DONE]
    │
    ├─► v1.1 Supabase Auth [2026-01-23] ⏳
    │
    ├─► v1.2 Content Upload [2026-02-06] ⏳
    │
    ├─► v1.3 Real-time Chat [2026-02-20] ⏳
    │
    ├─► v1.4 Stripe Payments [2026-03-06] ⏳
    │
    ├─► v1.5 Moderation [2026-03-20] ⏳
    │
    ├─► v1.6 Analytics [2026-04-03] ⏳
    │
    └─► v2.0 Scale & Polish [2026-05+] 🎯
```

---

## Critical Path (Must Do First)

1. ✅ **v1.0**: MVP mobile-first with demo data
2. 🔄 **v1.1**: Real authentication (Supabase Auth)
3. 🎬 **v1.2**: Real content upload (Supabase Storage)
4. 💬 **v1.3**: Real-time chat (Supabase Realtime)
5. 💳 **v1.4**: Real payments (Stripe)

**Why this order:**
- Auth needed before any data access
- Content upload needed before chat/social
- Chat builds community engagement
- Payments enable revenue

---

## Known Limitations (v1.0)

- [ ] No real database (localStorage only)
- [ ] No real authentication (DemoSession only)
- [ ] No file uploads (UI only)
- [ ] No real-time chat (mock messages)
- [ ] No payment processing
- [ ] No admin panel (demo buttons only)
- [ ] No notifications
- [ ] No analytics
- [ ] No mobile app (PWA only)

**These are intentional for MVP.** All planned in roadmap above.

---

## Contribution Guidelines

### For Adding Features

1. **Branch naming**
   ```bash
   git checkout -b feat/feature-name          # New feature
   git checkout -b fix/bug-description        # Bug fix
   git checkout -b docs/documentation-update  # Docs
   ```

2. **Commit message**
   ```
   feat: Add feature description
   fix: Fix bug description
   docs: Add documentation
   chore: Maintenance task
   refactor: Code improvement
   ```

3. **PR process**
   - Create PR with description of changes
   - Link to GitHub issue (if exists)
   - Add screenshot/video for UI changes
   - Request review
   - Merge when approved

### Code Standards
- Use TypeScript (no `any`)
- Follow component naming (PascalCase)
- Add JSDoc comments for functions
- Keep components < 300 lines (refactor if larger)
- Use meaningful variable names

### Testing
- Test locally before pushing
- Test on mobile viewport (DevTools)
- Test in both ES and EN locale
- Check console for errors/warnings

---

## Sponsorship & Support

**Interested in contributing?**

1. **Pick a task** from roadmap above
2. **Comment on GitHub issue** (or create one)
3. **Follow code standards** (above)
4. **Submit PR** with description

**Questions?**
- Create GitHub Discussion
- Open Issue with `[QUESTION]` tag

---

## Success Metrics (v1.0 → v2.0)

| Metric | Target |
|--------|--------|
| **Creators (model role)** | 100+ |
| **Subscribers (paying)** | 500+ |
| **Monthly revenue** | $5k+ |
| **Avg session duration** | 10+ min |
| **Mobile users %** | 85%+ |
| **Upload success rate** | 99%+ |
| **Chat message delivery** | 99.9%+ |

---

**Last Updated:** 2026-01-09  
**Maintained by:** Carlos Pinilla  
**Status:** On track ✅
