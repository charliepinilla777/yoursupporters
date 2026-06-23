import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoSession } from '../components/DemoSession'

interface Creator {
  id: string
  name: string
  emoji: string
  online: boolean
  gradient: string
  lastMessage: string
  time: string
  unread: number
}

interface Message {
  id: string
  text: string
  from: 'user' | 'creator'
  timestamp: string
}

const chatCreators: Creator[] = [
  {
    id: 'c1', name: 'Luna Noir', emoji: '🌙', online: true,
    gradient: 'linear-gradient(135deg, #1a0a2e, #FF2D78)',
    lastMessage: 'Hola! 🌙 Gracias por suscribirte 💜', time: '2m', unread: 3,
  },
  {
    id: 'c2', name: 'Vesper Aurea', emoji: '✨', online: false,
    gradient: 'linear-gradient(135deg, #2e0a1a, #B44FFF)',
    lastMessage: 'Tengo contenido especial para ti 🎨', time: '1h', unread: 0,
  },
  {
    id: 'c3', name: 'Morgana Velvet', emoji: '🖤', online: true,
    gradient: 'linear-gradient(135deg, #0a1a2e, #7B2FBE)',
    lastMessage: '¿Te gustó mi última sesión? 🖤', time: '3h', unread: 1,
  },
]

const initialMessages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', text: 'Hola! 🌙 Gracias por suscribirte 💜', from: 'creator', timestamp: '14:02' },
    { id: 'm2', text: '¿Qué tipo de contenido te gustaría ver?', from: 'creator', timestamp: '14:03' },
  ],
  c2: [
    { id: 'm1', text: 'Bienvenido a mi chat privado ✨', from: 'creator', timestamp: '13:00' },
    { id: 'm2', text: 'Tengo contenido especial preparado para ti 🎨', from: 'creator', timestamp: '13:01' },
  ],
  c3: [
    { id: 'm1', text: 'Hey! 🖤 Qué bueno verte aquí', from: 'creator', timestamp: '11:30' },
    { id: 'm2', text: '¿Te gustó mi última sesión de fotos?', from: 'creator', timestamp: '11:31' },
  ],
}

function nowTime(): string {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function Chat() {
  const navigate = useNavigate()
  const { isSubscribedTo, subscriptions } = useDemoSession()
  const [selected, setSelected] = useState<Creator | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const hasAnySubscription = subscriptions.length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selected])

  const send = () => {
    if (!input.trim() || !selected) return
    const msg: Message = { id: crypto.randomUUID(), text: input.trim(), from: 'user', timestamp: nowTime() }
    setMessages(prev => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), msg] }))
    setInput('')
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        text: '💜 Gracias por tu mensaje, te respondo pronto!',
        from: 'creator',
        timestamp: nowTime(),
      }
      setMessages(prev => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), reply] }))
    }, 700)
  }

  const filtered = chatCreators.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  const subscribed = selected ? isSubscribedTo(selected.id) : false

  /* ── ACTIVE CHAT VIEW ── */
  if (selected) {
    const msgs = messages[selected.id] || []
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        height: 'calc(100dvh - 56px - 72px)',
        marginTop: 56, background: '#08080E', color: '#F5F3FF',
        maxWidth: 520, margin: '56px auto 0',
      }}>
        {/* Chat header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px', background: '#110F1C',
          borderBottom: '1px solid rgba(180,79,255,0.15)', flexShrink: 0,
        }}>
          <button
            onClick={() => setSelected(null)}
            style={{ background: 'none', border: 'none', color: '#FF2D78', fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}
            aria-label="Volver"
          >←</button>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: selected.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>{selected.emoji}</div>
            {selected.online && (
              <div style={{
                position: 'absolute', bottom: 1, right: 1,
                width: 9, height: 9, borderRadius: '50%',
                background: '#00E87A', border: '2px solid #110F1C',
              }} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>{selected.name}</div>
            <div style={{ fontSize: 11, color: selected.online ? '#00E87A' : '#9B95B8' }}>
              {selected.online ? '● En línea' : 'Visto hace 2h'}
            </div>
          </div>
          <button
            onClick={() => navigate(`/creator/${selected.id}`)}
            style={{ background: 'none', border: 'none', color: '#9B95B8', fontSize: 20, cursor: 'pointer', padding: '0 4px' }}
            aria-label="Ver perfil"
          >ⓘ</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {!subscribed ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px', gap: 12 }}>
              <div style={{ fontSize: 64, lineHeight: 1 }}>🔒</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>Suscríbete a {selected.name} para chatear</div>
              <div style={{ fontSize: 14, color: '#9B95B8', maxWidth: 260 }}>
                Accede al chat privado y mensajes exclusivos
              </div>
              <button
                onClick={() => navigate(`/creator/${selected.id}`)}
                style={{
                  marginTop: 8, padding: '14px 28px', borderRadius: 24,
                  border: 'none', background: 'linear-gradient(135deg, #FF2D78, #B44FFF)',
                  color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255,45,120,0.4)',
                }}
              >💎 Suscribirme por $5/mes</button>
            </div>
          ) : (
            <>
              {msgs.map(msg => {
                const mine = msg.from === 'user'
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
                    <div style={{ fontSize: 11, color: '#9B95B8', marginBottom: 3, paddingLeft: mine ? 0 : 4, paddingRight: mine ? 4 : 0 }}>
                      {mine ? 'Tú' : selected.name}
                    </div>
                    <div style={{
                      maxWidth: '75%', padding: '10px 14px',
                      borderRadius: mine ? '16px 16px 0 16px' : '16px 16px 16px 0',
                      background: mine ? 'linear-gradient(135deg, #FF2D78, #B44FFF)' : '#1A1727',
                      color: '#F5F3FF', fontSize: 14, lineHeight: 1.5, wordBreak: 'break-word',
                    }}>{msg.text}</div>
                    <div style={{ fontSize: 11, color: '#9B95B8', marginTop: 3, paddingRight: mine ? 4 : 0, paddingLeft: mine ? 0 : 4 }}>
                      {msg.timestamp}
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', background: '#110F1C',
          borderTop: '1px solid rgba(180,79,255,0.15)', flexShrink: 0,
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send() }}
            placeholder={subscribed ? 'Escribe un mensaje...' : 'Suscríbete para enviar mensajes'}
            disabled={!subscribed}
            style={{
              flex: 1, background: '#1A1727', border: '1px solid rgba(180,79,255,0.2)',
              borderRadius: 22, padding: '10px 16px', color: '#F5F3FF', fontSize: 14,
              outline: 'none', opacity: subscribed ? 1 : 0.55,
            }}
          />
          <button
            onClick={send}
            disabled={!subscribed || !input.trim()}
            style={{
              width: 42, height: 42, borderRadius: '50%', border: 'none',
              background: 'linear-gradient(135deg, #FF2D78, #B44FFF)',
              color: '#fff', fontSize: 18, cursor: subscribed ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              opacity: subscribed && input.trim() ? 1 : 0.5,
              boxShadow: '0 2px 12px rgba(255,45,120,0.35)',
            }}
            aria-label="Enviar"
          >→</button>
        </div>
      </div>
    )
  }

  /* ── CREATOR LIST VIEW ── */
  return (
    <div style={{ background: '#08080E', minHeight: 'calc(100dvh - 56px - 72px)', color: '#F5F3FF', paddingTop: 56 }}>
      {/* Header */}
      <div style={{ padding: '24px 20px 12px', background: '#110F1C', borderBottom: '1px solid rgba(180,79,255,0.15)' }}>
        <h1 style={{ margin: '0 0 14px', fontSize: 22, fontWeight: 900 }}>💬 Mensajes</h1>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar conversación..."
          style={{
            width: '100%', boxSizing: 'border-box', background: '#1A1727',
            border: '1px solid rgba(180,79,255,0.2)', borderRadius: 22,
            padding: '10px 16px', color: '#F5F3FF', fontSize: 14, outline: 'none',
          }}
        />
      </div>

      {/* List */}
      <div>
        {filtered.map(creator => (
          <button
            key={creator.id}
            onClick={() => setSelected(creator)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              width: '100%', minHeight: 72, padding: '0 20px',
              background: 'none', border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer', textAlign: 'left', color: '#F5F3FF',
              transition: 'background 150ms',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 50, height: 50, borderRadius: '50%',
                background: creator.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{creator.emoji}</div>
              {creator.online && (
                <div style={{
                  position: 'absolute', bottom: 2, right: 2,
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#00E87A', border: '2px solid #08080E',
                }} />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{creator.name}</div>
              {isSubscribedTo(creator.id) ? (
                <div style={{ fontSize: 13, color: '#9B95B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {creator.lastMessage}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#9B95B8', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>🔒</span><span>Suscríbete para chatear</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: '#9B95B8' }}>{creator.time}</span>
              {creator.unread > 0 && isSubscribedTo(creator.id) && (
                <div style={{
                  minWidth: 20, height: 20, borderRadius: 10, background: '#FF2D78',
                  color: '#fff', fontSize: 11, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px',
                }}>{creator.unread}</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom CTA if no subscriptions */}
      {!hasAnySubscription && (
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Empieza a chatear</div>
          <div style={{ fontSize: 14, color: '#9B95B8', marginBottom: 20, lineHeight: 1.6 }}>
            Suscríbete a una creadora para acceder al chat privado
          </div>
          <button
            onClick={() => navigate('/explore')}
            style={{
              padding: '14px 28px', borderRadius: 24, border: 'none',
              background: 'linear-gradient(135deg, #FF2D78, #B44FFF)',
              color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255,45,120,0.35)',
            }}
          >🔥 Explorar Creadoras</button>
        </div>
      )}
    </div>
  )
}
