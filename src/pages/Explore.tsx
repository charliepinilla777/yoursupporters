import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoSession } from '../components/DemoSession'

function injectStyles() {
  if (document.getElementById('explore-kf')) return
  const s = document.createElement('style')
  s.id = 'explore-kf'
  s.textContent = `
    @keyframes skeletonPulse { 0%,100%{opacity:0.4} 50%{opacity:0.85} }
    @keyframes pinkPulse {
      0%  { box-shadow: 0 0 0 0 rgba(255,45,120,0.6); }
      70% { box-shadow: 0 0 0 10px rgba(255,45,120,0); }
      100%{ box-shadow: 0 0 0 0 rgba(255,45,120,0); }
    }
  `
  document.head.appendChild(s)
}

function fmtK(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n)
}

interface Creator {
  id: string; name: string; emoji: string; bio: string; tags: string[]
  followers: number; price: number; verified: boolean; online: boolean
  trending: boolean; gradient: string; subsCount: number
}

const CREATORS: Creator[] = [
  { id: 'c1', name: 'Luna Noir', emoji: '🌙', bio: 'Fotografía artística, lifestyle nocturno y contenido exclusivo para mis fans más especiales 🌙', tags: ['Photography', 'Lifestyle', 'Art'], followers: 12400, price: 5, verified: true, online: true, trending: true, subsCount: 847, gradient: 'linear-gradient(135deg, #1a0a2e, #FF2D78)' },
  { id: 'c2', name: 'Vesper Aurea', emoji: '✨', bio: 'Arte digital barroco, videos exclusivos y sesiones de fotos que no verás en ningún otro lugar ✨', tags: ['Digital Art', 'Video', 'Fashion'], followers: 8900, price: 5, verified: true, online: false, trending: true, subsCount: 562, gradient: 'linear-gradient(135deg, #2e0a1a, #B44FFF)' },
  { id: 'c3', name: 'Morgana Velvet', emoji: '🖤', bio: 'Editorial noir, moda alternativa y el contenido más oscuro y hermoso que encontrarás 🖤', tags: ['Fashion', 'Editorial', 'Noir'], followers: 19200, price: 5, verified: true, online: true, trending: false, subsCount: 1243, gradient: 'linear-gradient(135deg, #0a1a2e, #7B2FBE)' },
]

const FILTERS = ['Todas', '🔥 Trending', '💎 Premium', '🆕 Nuevas', '💬 En línea']

function SkeletonCard() {
  const sh: React.CSSProperties = { background: '#1A1727', borderRadius: 8, animation: 'skeletonPulse 1.4s ease-in-out infinite' }
  return (
    <div style={{ background: '#110F1C', border: '1px solid rgba(180,79,255,0.1)', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ ...sh, height: 160, borderRadius: 0 }} />
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10 }}><div style={{ ...sh, width: 36, height: 36, borderRadius: '50%' }} /><div style={{ ...sh, height: 16, flex: 1 }} /></div>
        <div style={{ ...sh, height: 12, width: '90%' }} />
        <div style={{ ...sh, height: 12, width: '70%' }} />
        <div style={{ ...sh, height: 40, marginTop: 4 }} />
      </div>
    </div>
  )
}

function CreatorCard({ c, subscribed, onSubscribe }: { c: Creator; subscribed: boolean; onSubscribe: () => void }) {
  const navigate = useNavigate()
  return (
    <div style={{ background: '#110F1C', border: '1px solid rgba(180,79,255,0.15)', borderRadius: 16, overflow: 'hidden' }}>
      <div onClick={() => navigate(`/creator/${c.id}`)} style={{ height: 160, background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative', cursor: 'pointer' }}>
        {c.emoji}
        {c.trending && <span style={{ position: 'absolute', top: 10, left: 10, background: '#FF2D78', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>🔥 TRENDING</span>}
        {c.online && <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,232,122,0.15)', border: '1px solid rgba(0,232,122,0.4)', color: '#00E87A', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>● En línea</span>}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{c.emoji}</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#F5F3FF' }}>{c.name}</div>
          {c.verified && <span style={{ color: '#FFD700', fontSize: 14, fontWeight: 900 }}>✓</span>}
        </div>
        <p style={{ margin: '0 0 10px', fontSize: 13, color: '#9B95B8', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.bio}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {c.tags.map(tag => <span key={tag} style={{ background: 'rgba(180,79,255,0.12)', border: '1px solid rgba(180,79,255,0.2)', color: '#B44FFF', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{tag}</span>)}
        </div>
        <div style={{ fontSize: 13, color: '#9B95B8', marginBottom: 14 }}>{fmtK(c.followers)} fans · ${c.price}/mes · {fmtK(c.subsCount)} suscritos</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => navigate('/chat')} style={{ flex: '0 0 auto', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(180,79,255,0.3)', background: 'transparent', color: '#B44FFF', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>💬 Chat</button>
          <button
            onClick={onSubscribe} disabled={subscribed}
            style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: subscribed ? '1px solid rgba(0,232,122,0.4)' : 'none', background: subscribed ? 'rgba(0,232,122,0.12)' : 'linear-gradient(135deg, #FF2D78, #B44FFF)', color: subscribed ? '#00E87A' : '#fff', fontSize: 13, fontWeight: 800, cursor: subscribed ? 'default' : 'pointer', animation: !subscribed ? 'pinkPulse 2.5s infinite' : 'none' } as React.CSSProperties}
          >{subscribed ? '✓ Suscrito' : `💎 Suscribirme $${c.price}/mes`}</button>
        </div>
      </div>
    </div>
  )
}

export default function Explore() {
  const { isSubscribedTo, subscribeTo } = useDemoSession()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todas')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    injectStyles()
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const filtered = CREATORS.filter(c => {
    const ms = search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const mf = activeFilter === 'Todas' || activeFilter === '🆕 Nuevas' ? true : activeFilter === '🔥 Trending' ? c.trending : activeFilter === '💬 En línea' ? c.online : activeFilter === '💎 Premium' ? c.price >= 5 : true
    return ms && mf
  })

  return (
    <div style={{ background: '#08080E', minHeight: '100dvh', paddingTop: 56, paddingBottom: 100, color: '#F5F3FF' }}>
      <div style={{ padding: '24px 20px 0' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 900 }}>Explorar Creadoras 🔥</h1>
        <p style={{ margin: '0 0 14px', fontSize: 14, color: '#9B95B8' }}>Descubre contenido exclusivo de las mejores creadoras</p>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre, categoría..." style={{ width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: 12, border: '1px solid rgba(180,79,255,0.2)', background: '#110F1C', color: '#F5F3FF', fontSize: 14, outline: 'none' }} />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 0 4px', scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 999, border: activeFilter === f ? 'none' : '1px solid rgba(180,79,255,0.15)', background: activeFilter === f ? 'linear-gradient(135deg, #FF2D78, #B44FFF)' : 'rgba(245,243,255,0.06)', color: activeFilter === f ? '#fff' : '#9B95B8', fontSize: 13, fontWeight: 700, cursor: 'pointer' } as React.CSSProperties}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ background: 'linear-gradient(135deg, #FF2D78, #B44FFF)', borderRadius: 14, padding: '14px 18px', fontSize: 14, fontWeight: 700, color: '#fff', boxShadow: '0 4px 20px rgba(255,45,120,0.3)' }}>🔥 Más de 500 creadoras nuevas este mes</div>
      </div>
      <div style={{ padding: '18px 20px 0' }}>
        {loading ? (
          <div style={{ display: 'grid', gap: 16 }}><SkeletonCard /><SkeletonCard /></div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9B95B8', fontSize: 15, lineHeight: 1.6 }}>No encontramos creadoras con ese filtro.<br />Intenta con otro término 🔍</div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {filtered.map(c => <CreatorCard key={c.id} c={c} subscribed={isSubscribedTo(c.id)} onSubscribe={() => subscribeTo(c.id)} />)}
          </div>
        )}
      </div>
    </div>
  )
}
