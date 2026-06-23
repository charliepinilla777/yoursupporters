import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoSession } from '../components/DemoSession'

function fmtK(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n)
}

interface Photo {
  id: string; likes: number; saved: number; locked: boolean; premium: boolean; size: 'large' | 'small'; bg: string
  creator: { id: string; name: string; emoji: string }
}

const PHOTOS: Photo[] = [
  { id: 'p1', likes: 2840, saved: 342, locked: true, premium: true, size: 'large', bg: 'linear-gradient(135deg, #1a0a2e, #FF2D78, #2e0a1a)', creator: { id: 'c1', name: 'Luna Noir', emoji: '🌙' } },
  { id: 'p2', likes: 1230, saved: 89, locked: false, premium: false, size: 'small', bg: 'linear-gradient(135deg, #0a1a2e, #B44FFF)', creator: { id: 'c2', name: 'Vesper Aurea', emoji: '✨' } },
  { id: 'p3', likes: 5670, saved: 891, locked: true, premium: true, size: 'small', bg: 'linear-gradient(135deg, #2e1a0a, #FFD700)', creator: { id: 'c3', name: 'Morgana Velvet', emoji: '🖤' } },
  { id: 'p4', likes: 893, saved: 67, locked: false, premium: false, size: 'large', bg: 'linear-gradient(135deg, #0a2e1a, #7B2FBE)', creator: { id: 'c1', name: 'Luna Noir', emoji: '🌙' } },
  { id: 'p5', likes: 3210, saved: 445, locked: true, premium: true, size: 'small', bg: 'linear-gradient(135deg, #1a0a1a, #FF2D78, #B44FFF)', creator: { id: 'c2', name: 'Vesper Aurea', emoji: '✨' } },
  { id: 'p6', likes: 678, saved: 23, locked: false, premium: false, size: 'small', bg: 'linear-gradient(135deg, #2e0a0a, #7B2FBE)', creator: { id: 'c3', name: 'Morgana Velvet', emoji: '🖤' } },
  { id: 'p7', likes: 4520, saved: 678, locked: true, premium: true, size: 'large', bg: 'linear-gradient(135deg, #0a0a2e, #FF2D78)', creator: { id: 'c1', name: 'Luna Noir', emoji: '🌙' } },
  { id: 'p8', likes: 1890, saved: 234, locked: true, premium: false, size: 'small', bg: 'linear-gradient(135deg, #1a2e0a, #B44FFF)', creator: { id: 'c2', name: 'Vesper Aurea', emoji: '✨' } },
]

const CREATORS_SPOTLIGHT = [
  { id: 'c1', name: 'Luna Noir', emoji: '🌙', photos: '124 fotos', gradient: 'linear-gradient(135deg, #1a0a2e, #FF2D78)' },
  { id: 'c2', name: 'Vesper Aurea', emoji: '✨', photos: '89 fotos', gradient: 'linear-gradient(135deg, #2e0a1a, #B44FFF)' },
  { id: 'c3', name: 'Morgana Velvet', emoji: '🖤', photos: '213 fotos', gradient: 'linear-gradient(135deg, #0a1a2e, #7B2FBE)' },
]

type Filter = 'all' | 'exclusive' | 'recent' | 'popular'

function PhotoCard({ p, subscribed, onLocked }: { p: Photo; subscribed: boolean; onLocked: () => void }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const canView = !p.locked || subscribed
  const height = p.size === 'large' ? 260 : 160

  return (
    <div
      onClick={() => canView ? undefined : onLocked()}
      style={{ borderRadius: 14, overflow: 'hidden', background: p.bg, height, position: 'relative', cursor: canView ? 'default' : 'pointer' }}
    >
      {/* Blur overlay for locked */}
      {p.locked && !subscribed && (
        <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', background: 'rgba(8,8,14,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 26 }}>🔒</div>
          {p.premium && <div style={{ fontSize: 10, fontWeight: 800, color: '#FFD700', background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)', padding: '2px 10px', borderRadius: 999 }}>👑 PREMIUM</div>}
          <button
            onClick={(e) => { e.stopPropagation(); onLocked() }}
            style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #FF2D78, #B44FFF)', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', marginTop: 4 }}
          >Suscribirme</button>
        </div>
      )}

      {/* Unlocked content overlay */}
      {canView && (
        <>
          {p.premium && (
            <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,215,0,0.2)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 999 }}>👑 PREMIUM</div>
          )}
          {/* Bottom gradient info */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(8,8,14,0.9) 0%, transparent 100%)', padding: '20px 10px 8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <button onClick={() => navigate(`/creator/${p.creator.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg,#FF2D78,#B44FFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{p.creator.emoji}</div>
              <span style={{ fontSize: 11, color: '#F5F3FF', fontWeight: 600 }}>{p.creator.name}</span>
            </button>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => setLiked(l => !l)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: liked ? '#FF2D78' : '#F5F3FF' }}>{liked ? '❤️' : '🤍'}</button>
              <span style={{ fontSize: 11, color: '#9B95B8' }}>{fmtK(p.likes + (liked ? 1 : 0))}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function Photos() {
  const navigate = useNavigate()
  const { isSubscribedTo } = useDemoSession()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const filtered = PHOTOS.filter(p => {
    if (activeFilter === 'exclusive') return p.premium
    if (activeFilter === 'popular') return p.likes > 2000
    return true
  })

  // Split into 2 columns
  const col1 = filtered.filter((_, i) => i % 2 === 0)
  const col2 = filtered.filter((_, i) => i % 2 === 1)

  return (
    <div style={{ background: '#08080E', minHeight: '100dvh', paddingTop: 56, paddingBottom: 100, color: '#F5F3FF' }}>

      {/* Header */}
      <div style={{ padding: '24px 20px 16px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900 }}>Galería de Fotos 📸</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#9B95B8' }}>2,847 fotos · 127 creadoras</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {([['all', 'Todas'], ['exclusive', '💎 Exclusivas'], ['popular', '🔥 Populares'], ['recent', '🆕 Recientes']] as [Filter, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                flexShrink: 0, padding: '8px 16px', borderRadius: 999,
                border: activeFilter === key ? 'none' : '1px solid rgba(180,79,255,0.15)',
                background: activeFilter === key ? 'linear-gradient(135deg, #FF2D78, #B44FFF)' : 'rgba(245,243,255,0.06)',
                color: activeFilter === key ? '#fff' : '#9B95B8',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
              } as React.CSSProperties}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Creator spotlight */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ padding: '0 20px 10px' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>✨ Creadoras Destacadas</h2>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 20px', scrollbarWidth: 'none' }}>
          {CREATORS_SPOTLIGHT.map(c => (
            <button key={c.id} onClick={() => navigate(`/creator/${c.id}`)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '2px solid rgba(255,45,120,0.4)' }}>{c.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#F5F3FF', whiteSpace: 'nowrap' }}>{c.name}</div>
              <div style={{ fontSize: 10, color: '#9B95B8' }}>{c.photos}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {col1.map(p => <PhotoCard key={p.id} p={p} subscribed={isSubscribedTo(p.creator.id)} onLocked={() => navigate(`/creator/${p.creator.id}`)} />)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            {col2.map(p => <PhotoCard key={p.id} p={p} subscribed={isSubscribedTo(p.creator.id)} onLocked={() => navigate(`/creator/${p.creator.id}`)} />)}
          </div>
        </div>
      </div>

      {/* Creator CTA */}
      <div style={{ margin: '32px 16px 0', background: 'linear-gradient(135deg, #1A1727, #231F32)', borderRadius: 20, padding: '28px 20px', textAlign: 'center', border: '1px solid rgba(180,79,255,0.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(180,79,255,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 32, marginBottom: 10 }}>💰</div>
        <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 900 }}>¿Eres creadora?</h3>
        <p style={{ margin: '0 0 20px', fontSize: 14, color: '#9B95B8', lineHeight: 1.6 }}>
          Comparte tu contenido y gana dinero con tu galería de fotos
        </p>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '14px 28px', borderRadius: 24, border: 'none', background: 'linear-gradient(135deg, #FFD700, #FF8C00)', color: '#08080E', fontWeight: 900, fontSize: 15, cursor: 'pointer' }}>
          Empezar a crear 👑
        </button>
      </div>
    </div>
  )
}
