import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoSession } from '../components/DemoSession'

function fmtK(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n)
}

interface Video {
  id: string; title: string; duration: string; views: number; likes: number
  locked: boolean; trending: boolean; thumbnail: string
  creator: { id: string; name: string; emoji: string }
}

const VIDEOS: Video[] = [
  { id: 'v1', title: 'Behind the Scenes 🌙', duration: '4:32', views: 12400, likes: 892, locked: true, trending: true, thumbnail: 'linear-gradient(135deg, #1a0a2e, #FF2D78)', creator: { id: 'c1', name: 'Luna Noir', emoji: '🌙' } },
  { id: 'v2', title: 'Tutorial de Maquillaje ✨', duration: '8:15', views: 8300, likes: 654, locked: false, trending: true, thumbnail: 'linear-gradient(135deg, #2e0a1a, #B44FFF)', creator: { id: 'c2', name: 'Vesper Aurea', emoji: '✨' } },
  { id: 'v3', title: 'Mi Rutina Matutina 💜', duration: '6:22', views: 5100, likes: 423, locked: true, trending: false, thumbnail: 'linear-gradient(135deg, #0a1a2e, #7B2FBE)', creator: { id: 'c1', name: 'Luna Noir', emoji: '🌙' } },
  { id: 'v4', title: 'Photoshoot Exclusivo 📸', duration: '2:50', views: 19800, likes: 1240, locked: true, trending: true, thumbnail: 'linear-gradient(135deg, #1a0a0a, #FF2D78)', creator: { id: 'c3', name: 'Morgana Velvet', emoji: '🖤' } },
  { id: 'v5', title: 'Q&A con mis fans 💬', duration: '15:33', views: 3200, likes: 287, locked: false, trending: false, thumbnail: 'linear-gradient(135deg, #0a2e1a, #00E87A)', creator: { id: 'c2', name: 'Vesper Aurea', emoji: '✨' } },
  { id: 'v6', title: 'Unboxing Especial 🎁', duration: '5:18', views: 7600, likes: 531, locked: true, trending: false, thumbnail: 'linear-gradient(135deg, #2e1a0a, #FFD700)', creator: { id: 'c3', name: 'Morgana Velvet', emoji: '🖤' } },
]

type Filter = 'all' | 'subscriptions' | 'trending' | 'new'

function VideoCard({ v, subscribed, onLocked }: { v: Video; subscribed: boolean; onLocked: () => void }) {
  const navigate = useNavigate()
  const canWatch = !v.locked || subscribed

  return (
    <div
      onClick={() => canWatch ? undefined : onLocked()}
      style={{ borderRadius: 14, overflow: 'hidden', background: '#110F1C', border: '1px solid rgba(180,79,255,0.15)', cursor: canWatch ? 'default' : 'pointer' }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', paddingTop: '56.25%', background: v.thumbnail }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {v.locked && !subscribed ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))' }}>🔒</div>
              <div style={{ fontSize: 11, color: 'rgba(245,243,255,0.85)', fontWeight: 700, marginTop: 6, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Solo suscriptores</div>
            </div>
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
              <span style={{ fontSize: 20, color: '#fff', marginLeft: 3 }}>▶</span>
            </div>
          )}
        </div>
        {/* Duration badge */}
        <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>{v.duration}</div>
        {/* Trending badge */}
        {v.trending && <div style={{ position: 'absolute', top: 8, left: 8, background: '#FF2D78', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 999 }}>🔥 TOP</div>}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#F5F3FF', marginBottom: 8, lineHeight: 1.3 }}>{v.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => navigate(`/creator/${v.creator.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#FF2D78,#B44FFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{v.creator.emoji}</div>
            <span style={{ fontSize: 12, color: '#9B95B8', fontWeight: 600 }}>{v.creator.name}</span>
          </button>
          <div style={{ display: 'flex', gap: 10, fontSize: 12, color: '#9B95B8' }}>
            <span>👁 {fmtK(v.views)}</span>
            <span>❤️ {fmtK(v.likes)}</span>
          </div>
        </div>
        {v.locked && !subscribed && (
          <button
            onClick={(e) => { e.stopPropagation(); onLocked() }}
            style={{ marginTop: 10, width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #FF2D78, #B44FFF)', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
          >💎 Suscribirme para ver</button>
        )}
      </div>
    </div>
  )
}

export default function Videos() {
  const navigate = useNavigate()
  const { isSubscribedTo } = useDemoSession()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const filtered = VIDEOS.filter(v => {
    if (activeFilter === 'trending') return v.trending
    if (activeFilter === 'subscriptions') return !v.locked
    return true
  })

  const trending = VIDEOS.filter(v => v.trending)

  return (
    <div style={{ background: '#08080E', minHeight: '100dvh', paddingTop: 56, paddingBottom: 100, color: '#F5F3FF' }}>

      {/* Header */}
      <div style={{ padding: '24px 20px 16px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900 }}>Videos Exclusivos 🎬</h1>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#9B95B8' }}>Contenido de video de tus creadoras favoritas</p>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, background: '#110F1C', borderRadius: 12, padding: 4, border: '1px solid rgba(180,79,255,0.15)' }}>
          {([['all', 'Todos'], ['trending', '🔥 Tendencias'], ['subscriptions', 'Gratis'], ['new', '🆕 Nuevos']] as [Filter, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                flex: 1, padding: '8px 4px', borderRadius: 8, border: 'none',
                background: activeFilter === key ? 'linear-gradient(135deg, #FF2D78, #B44FFF)' : 'transparent',
                color: activeFilter === key ? '#fff' : '#9B95B8',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
              } as React.CSSProperties}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Trending horizontal scroll */}
      {activeFilter === 'all' && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>🔥 Trending Ahora</h2>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '4px 20px 8px', scrollbarWidth: 'none' }}>
            {trending.map(v => (
              <div key={v.id} style={{ minWidth: 200, borderRadius: 14, overflow: 'hidden', background: '#110F1C', flexShrink: 0, border: '1px solid rgba(180,79,255,0.15)' }}>
                <div style={{ position: 'relative', height: 110, background: v.thumbnail, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {v.locked && !isSubscribedTo(v.creator.id) ? (
                    <span style={{ fontSize: 24 }}>🔒</span>
                  ) : (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#fff', fontSize: 14, marginLeft: 2 }}>▶</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 5 }}>{v.duration}</div>
                </div>
                <div style={{ padding: '8px 10px 10px' }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: '#F5F3FF', marginBottom: 4, lineHeight: 1.3 }}>{v.title}</div>
                  <div style={{ fontSize: 11, color: '#9B95B8' }}>{v.creator.emoji} {v.creator.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main grid */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map(v => (
            <VideoCard
              key={v.id} v={v}
              subscribed={isSubscribedTo(v.creator.id)}
              onLocked={() => navigate(`/creator/${v.creator.id}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9B95B8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Sin videos disponibles</div>
            <div style={{ fontSize: 14, marginBottom: 20 }}>Suscríbete a creadoras para ver su contenido exclusivo</div>
            <button onClick={() => navigate('/explore')} style={{ padding: '14px 28px', borderRadius: 24, border: 'none', background: 'linear-gradient(135deg, #FF2D78, #B44FFF)', color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              🔥 Explorar Creadoras
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
