import { useState, useEffect } from "react"
import AppHeader from "../components/AppHeader"
import GothicFrame from "../components/GothicFrame"
import Loading from "../components/Loading"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../lib/api"
import { containsForbiddenContact } from "../lib/policy"

type Msg = { id: string; from: "me" | "creator"; text: string }

export default function Chat() {
  const { user } = useAuth()
  const [selected, setSelected] = useState("")
  const [draft, setDraft] = useState("")
  const [messages, setMessages] = useState<Msg[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscriptions, setSubscriptions] = useState<any[]>([])

  useEffect(() => {
    loadSubscriptions()
  }, [])

  const loadSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await api.getMySubscriptions()
      setSubscriptions(response.subscriptions || [])
      setSelected(response.subscriptions?.[0]?.creatorId || "")
      // Cargar mensajes iniciales
      if (response.subscriptions?.[0]?.creatorId) {
        loadMessages()
      }
    } catch (error) {
      console.error('Error loading subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async () => {
    try {
      // Por ahora usamos mensajes de demo hasta implementar el endpoint
      setMessages([{ id: "m1", from: "creator", text: "Bienvenida. ¿En qué puedo ayudarte?" }])
    } catch (error) {
      console.error('Error loading messages:', error)
      // Mensaje de bienvenida por defecto
      setMessages([{ id: "m1", from: "creator", text: "Bienvenida. ¿En qué puedo ayudarte?" }])
    }
  }

  const isFan = user?.role === "user"
  const canChat = !isFan || subscriptions.some((s) => s.creatorId === selected)

  const creatorName = subscriptions.find(s => s.creatorId === selected)?.creatorName || "Creadora"

  const send = () => {
    setError(null)
    const text = draft.trim()
    if (!text) return

    if (containsForbiddenContact(text)) {
      setError("No se permite compartir teléfono/WhatsApp/Telegram ni coordinar encuentros presenciales.")
      return
    }

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: "me", text }])
    setDraft("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          from: "creator",
          text: "Gracias. Recuerda: solo chat dentro de la app (sin contacto externo).",
        },
      ])
    }, 450)
  }

  if (loading) {
    return (
      <div className="app-shell">
        <AppHeader title="Inbox" badge="Chat 1:1" />
        <main className="screen">
          <Loading text="CARGANDO" />
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <AppHeader title="Inbox" badge="Chat 1:1" />

      <main className="screen">
        <GothicFrame>
          <div className="muted" style={{ fontSize: 12 }}>
            Regla: fans solo pueden chatear si están suscritos a la creadora. Prohibido
teléfono/WhatsApp/Telegram.
          </div>

          <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
            <label className="muted" style={{ fontSize: 12 }}>Conversación</label>
            <select className="input" value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="c1">Luna Noir</option>
              <option value="c2">Vesper Aurea</option>
              <option value="c3">Morgana Velvet</option>
            </select>
          </div>
        </GothicFrame>

        <div style={{ height: 12 }} />

        <GothicFrame>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ fontWeight: 800 }}>{creatorName}</div>
            <span className="badge">{canChat ? "Habilitado" : "Bloqueado"}</span>
          </div>

          <div className="divider" style={{ margin: "12px 0" }} />

          <div style={{ display: "grid", gap: 10, maxHeight: 360, overflow: "auto", paddingRight: 4 }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  justifySelf: m.from === "me" ? "end" : "start",
                  maxWidth: "88%",
                  borderRadius: 16,
                  padding: "10px 12px",
                  background: m.from === "me" ? "rgba(var(--surface-2),1)" : "rgba(var(--bg),0.35)",
                  border: "1px solid rgba(var(--gold),0.16)",
                }}
              >
                <div style={{ fontSize: 14 }}>{m.text}</div>
              </div>
            ))}
          </div>

          <div className="divider" style={{ margin: "12px 0" }} />

          {!canChat ? (
            <div className="badge">Necesitas suscribirte a esta creadora para chatear.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {error && <div className="badge" style={{ borderColor: "rgba(255,80,80,0.35)" }}>{error}</div>}
              <input
                className="input"
                placeholder="Escribe un mensaje..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send() }}
              />
              <button className="btn btn--primary" onClick={send}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Enviar</strong>
              </button>
            </div>
          )}
        </GothicFrame>
      </main>
    </div>
  )
}
