import { useMemo, useState } from "react"
import AppHeader from "../components/AppHeader"
import GothicFrame from "../components/GothicFrame"
import { useDemoSession } from "../components/DemoSession"
import { containsForbiddenContact } from "../lib/policy"

type Msg = { id: string; from: "me" | "creator"; text: string }

export default function Chat() {
  const { subscriptions, user } = useDemoSession()
  const [selected, setSelected] = useState(subscriptions[0]?.creatorId ?? "c1")
  const [draft, setDraft] = useState("")
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m1", from: "creator", text: "Bienvenida. ¿En qué puedo ayudarte?" },
  ])
  const [error, setError] = useState<string | null>(null)

  const isFan = user.role === "user"
  const canChat = !isFan || subscriptions.some((s) => s.creatorId === selected)

  const creatorName = useMemo(() => {
    if (selected === "c1") return "Luna Noir"
    if (selected === "c2") return "Vesper Aurea"
    if (selected === "c3") return "Morgana Velvet"
    return "Creadora"
  }, [selected])

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
