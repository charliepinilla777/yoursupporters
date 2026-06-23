import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function injectStyles() {
  if (document.getElementById('landing-kf')) return
  const s = document.createElement('style')
  s.id = 'landing-kf'
  s.textContent = `
    @keyframes pinkPulse {
      0%   { box-shadow: 0 0 0 0 rgba(255,45,120,0.7), 0 4px 24px rgba(255,45,120,0.45); }
      70%  { box-shadow: 0 0 0 14px rgba(255,45,120,0), 0 4px 32px rgba(255,45,120,0.2); }
      100% { box-shadow: 0 0 0 0 rgba(255,45,120,0), 0 4px 24px rgba(255,45,120,0.45); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes floatBadge {
      0%,100% { transform: translateY(0); }
      50%     { transform: translateY(-4px); }
    }
  `
  document.head.appendChild(s)
}

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let t0: number | null = null
    const frame = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [target, duration, started])
  return count
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return String(n)
}

function StatCard({ value, label, prefix = '', suffix = '', delay = 0, started }: {
  value: number; label: string; prefix?: string; suffix?: string; delay?: number; started: boolean
}) {
  const count = useCountUp(value, 1800, started)
  return (
    <div style={{ background: '#110F1C', border: '1px solid rgba(180,79,255,0.18)', borderRadius: 16, padding: '20px 12px', textAlign: 'center', animation: started ? `fadeUp 0.6s ease ${delay}ms both` : 'none' }}>
      <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.1, marginBottom: 6, background: 'linear-gradient(135deg, #FF2D78, #B44FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {prefix}{fmtNum(count)}{suffix}
      </div>
      <div style={{ fontSize: 10, color: '#9B95B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</div>
    </div>
  )
}

function CreatorPreview({ name, emoji, fans, to, gradient }: { name: string; emoji: string; fans: string; to: string; gradient: string }) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(to)} style={{ minWidth: 156, borderRadius: 16, overflow: 'hidden', background: '#110F1C', border: '1px solid rgba(180,79,255,0.18)', cursor: 'pointer', flexShrink: 0 }}>
      <div style={{ height: 96, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, position: 'relative' }}>
        {emoji}
        <span style={{ position: 'absolute', top: 8, left: 8, background: '#FF2D78', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 999 }}>🔥 TREND</span>
      </div>
      <div style={{ padding: '12px 12px 14px' }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: '#F5F3FF', marginBottom: 2 }}>{name}</div>
        <div style={{ fontSize: 12, color: '#9B95B8', marginBottom: 8 }}>{fans} fans</div>
        <div style={{ fontSize: 12, color: '#FF6BA8', fontWeight: 700 }}>Ver perfil →</div>
      </div>
    </div>
  )
}

function BenefitCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ background: '#110F1C', border: '1px solid rgba(180,79,255,0.15)', borderRadius: 16, padding: '16px 14px' }}>
      <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 800, fontSize: 14, color: '#F5F3FF', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12, color: '#9B95B8', lineHeight: 1.5 }}>{desc}</div>
    </div>
  )
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FF2D78', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff', flexShrink: 0, boxShadow: '0 0 12px rgba(255,45,120,0.5)' }}>{n}</div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 14, color: '#F5F3FF', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#9B95B8', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    injectStyles()
    const t = setTimeout(() => setStatsStarted(true), 400)
    return () => clearTimeout(t)
  }, [])

  const btnPrimary: React.CSSProperties = {
    width: '100%', padding: '16px 24px', borderRadius: 14, border: 'none',
    background: 'linear-gradient(135deg, #FF2D78, #B44FFF, #7B2FBE)',
    color: '#fff', fontSize: 17, fontWeight: 800, cursor: 'pointer',
    animation: 'pinkPulse 2.2s infinite', letterSpacing: '0.2px',
  }

  return (
    <div style={{ background: '#08080E', minHeight: '100dvh', paddingTop: 56, paddingBottom: 100, color: '#F5F3FF' }}>

      {/* HERO */}
      <section style={{ padding: '40px 20px 36px', textAlign: 'center', background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(180,79,255,0.18) 0%, transparent 70%)', animation: 'fadeUp 0.7s ease both' }}>
        <h1 style={{ margin: '0 0 14px', fontSize: 'clamp(24px,6.5vw,32px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #F5F3FF 30%, #FF6BA8 65%, #B44FFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          El Contenido que No Encontrarás en Ningún Otro Lugar 🔥
        </h1>
        <p style={{ margin: '0 auto 28px', fontSize: 15, color: '#9B95B8', lineHeight: 1.6, maxWidth: 340 }}>
          Únete a miles de fans que ya disfrutan contenido exclusivo de sus creadoras favoritas
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360, margin: '0 auto 24px' }}>
          <button onClick={() => navigate('/explore')} style={btnPrimary}>🔥 Ver Contenido Exclusivo</button>
          <button onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '15px 24px', borderRadius: 14, border: '2px solid #FFD700', background: 'transparent', color: '#FFD700', fontSize: 17, fontWeight: 800, cursor: 'pointer' }}>
            💰 Empieza a Ganar
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          {['🔒 100% Privado', '💳 Pago Seguro', '✅ Verificadas'].map(b => (
            <span key={b} style={{ background: 'rgba(245,243,255,0.06)', border: '1px solid rgba(245,243,255,0.12)', borderRadius: 999, padding: '6px 14px', fontSize: 12, color: '#9B95B8', fontWeight: 600, animation: 'floatBadge 3s ease-in-out infinite' }}>{b}</span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '0 20px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <StatCard value={10847} label="Creadoras Activas" delay={0} started={statsStarted} />
          <StatCard value={523000} label="Fans Registrados" suffix="+" delay={100} started={statsStarted} />
          <StatCard value={2300000} label="Ganado por Creadoras" prefix="$" suffix="+" delay={200} started={statsStarted} />
          <StatCard value={49} label="Valoración Media" suffix="★" delay={300} started={statsStarted} />
        </div>
      </section>

      {/* TRENDING CREATORS */}
      <section style={{ paddingBottom: 32 }}>
        <div style={{ padding: '0 20px 14px' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, letterSpacing: '-0.3px' }}>✨ Creadoras en Tendencia</h2>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 20px 8px', scrollbarWidth: 'none' }}>
          <CreatorPreview name="Luna Noir" emoji="🌙" fans="12.4K" to="/creator/c1" gradient="linear-gradient(135deg,#1a0a2e,#FF2D78)" />
          <CreatorPreview name="Vesper Aurea" emoji="✨" fans="8.9K" to="/creator/c2" gradient="linear-gradient(135deg,#2e0a1a,#B44FFF)" />
          <CreatorPreview name="Morgana Velvet" emoji="🖤" fans="19.2K" to="/creator/c3" gradient="linear-gradient(135deg,#0a1a2e,#7B2FBE)" />
        </div>
      </section>

      {/* FOR FANS */}
      <section style={{ padding: '0 20px 32px' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 900, letterSpacing: '-0.3px' }}>¿Por qué unirte como Fan? 💜</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <BenefitCard icon="🎬" title="Videos Exclusivos" desc="Accede a contenido que no verás en ninguna red social" />
          <BenefitCard icon="💬" title="Chat Privado" desc="Habla directamente con tus creadoras favoritas" />
          <BenefitCard icon="📸" title="Fotos Premium" desc="Galerías exclusivas actualizadas diariamente" />
          <BenefitCard icon="💎" title="Acceso VIP" desc="Sé el primero en ver nuevo contenido" />
        </div>
      </section>

      {/* FOR CREATORS */}
      <section style={{ padding: '36px 20px', background: 'linear-gradient(135deg, #1A1727, #231F32)', borderTop: '1px solid rgba(180,79,255,0.2)', borderBottom: '1px solid rgba(180,79,255,0.2)', marginBottom: 32 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 900, lineHeight: 1.25 }}>¿Eres Creadora? 👑 Empieza a Ganar Dinero Hoy</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: '#9B95B8', lineHeight: 1.6 }}>
          Únete a más de 10,000 creadoras que ya monetizan su contenido en nuestra plataforma
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Cobra en 24-48 horas', 'Tú decides el precio de tus suscripciones', 'Contenido 100% protegido y privado', 'Panel de estadísticas en tiempo real', 'Soporte dedicado para creadoras'].map(item => (
            <li key={item} style={{ display: 'flex', gap: 10, fontSize: 14 }}>
              <span style={{ color: '#00E87A', fontWeight: 800, flexShrink: 0 }}>✅</span>{item}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '17px 24px', borderRadius: 14, border: 'none', background: '#FFD700', color: '#08080E', fontSize: 16, fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 24px rgba(255,215,0,0.35)' }}>
          💰 Empieza a Crear Ahora — Es Gratis
        </button>
        <p style={{ margin: '12px 0 0', fontSize: 12, color: '#9B95B8', textAlign: 'center' }}>Sin cuota mensual · Solo nos llevamos el 20% cuando ganas</p>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '0 20px 36px' }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 900, letterSpacing: '-0.3px' }}>¿Cómo funciona? 🚀</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Step n={1} title="Regístrate gratis" desc="Crea tu cuenta en menos de 1 minuto, sin tarjeta de crédito" />
          <Step n={2} title="Encuentra tus creadoras favoritas" desc="Explora cientos de creadoras verificadas y elige quién te gusta" />
          <Step n={3} title="Disfruta contenido exclusivo" desc="Accede a fotos, videos y chat privado que no encontrarás en ningún otro lugar" />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '32px 20px 40px', textAlign: 'center', background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,45,120,0.12) 0%, transparent 70%)' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 900, lineHeight: 1.3 }}>¿Esperando qué? El contenido te espera 🔥</h2>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: '#9B95B8' }}>Miles de fans ya están dentro. No te quedes fuera.</p>
        <button onClick={() => navigate('/explore')} style={{ ...btnPrimary, maxWidth: 360 }}>Explorar Creadoras</button>
      </section>
    </div>
  )
}
