import { useMemo, useState } from "react"
import AppHeader from "../components/AppHeader"
import GothicFrame from "../components/GothicFrame"
import { useDemoSession } from "../components/DemoSession"
import { containsForbiddenContact, validateSocialUrl } from "../lib/policy"

export default function CreatorDashboard() {
  const { user, setRole, setVerificationStatus, locale, subscriptions } = useDemoSession()

  const isCreator = user.role === "model"

  const [instagram, setInstagram] = useState("")
  const [x, setX] = useState("")
  const [web, setWeb] = useState("")
  const [bio, setBio] = useState("Creadora de contenido digital. Estilo noir y editorial.")
  const [error, setError] = useState<string | null>(null)
  const [okMsg, setOkMsg] = useState<string | null>(null)

  const gate = useMemo(() => {
    if (!isCreator) {
      return { canPublish: false as const, reason: 'Cambia tu rol a "model" para ver el panel de creadora.' }
    }
    if (user.verification_status !== "approved") {
      return {
        canPublish: false as const,
        reason: "Verificación 18+ requerida antes de publicar. Estado: " + user.verification_status,
      }
    }
    return { canPublish: true as const, reason: "" }
  }, [isCreator, user.verification_status])

  const save = () => {
    setError(null)
    setOkMsg(null)

    if (containsForbiddenContact(bio)) {
      setError("No se permite incluir teléfono/WhatsApp/Telegram ni coordinar encuentros presenciales.")
      return
    }

    for (const u of [instagram, x, web]) {
      const v = validateSocialUrl(u)
      if (!v.ok) {
        setError(v.error)
        return
      }
    }

    setOkMsg(locale === "es" ? "Guardado (demo)." : "Saved (demo).")
  }

  return (
    <div className="app-shell">
      <AppHeader title={isCreator ? "Dashboard de creadora" : "Perfil (demo)"} badge={`Rol: ${user.role}`} />

      <main className="screen">
        <GothicFrame>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontWeight: 900 }}>Sesión demo</div>
            <div className="muted" style={{ fontSize: 12 }}>
              Idioma: {locale.toUpperCase()} · Suscripciones activas: {subscriptions.length}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="btn" onClick={() => setRole("user")}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Fan</strong>
              </button>
              <button className="btn" onClick={() => setRole("model")}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Creadora</strong>
              </button>
              <button className="btn" onClick={() => setRole("admin")}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Admin</strong>
              </button>
              <button className="btn" onClick={() => setRole("supervisor")}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Supervisor</strong>
              </button>
            </div>

            <div className="divider" />

            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ fontWeight: 800 }}>Verificación 18+ (demo)</div>
              <div className="muted" style={{ fontSize: 12 }}>
                Solo creadoras con <strong>approved</strong> pueden publicar/monetizar.
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                <button className="btn btn-verification" onClick={() => setVerificationStatus("pending")}>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>
                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                  <strong>pending</strong>
                </button>
                <button className="btn btn--primary btn-verification" onClick={() =>
setVerificationStatus("approved")}>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>
                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                  <strong>approved</strong>
                </button>
                <button className="btn btn-verification" onClick={() => setVerificationStatus("rejected")}>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>
                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                  <strong>rejected</strong>
                </button>
              </div>

              {!gate.canPublish && (
                <div className="badge" style={{ borderColor: "rgba(255,180,80,0.35)" }}>
                  {gate.reason}
                </div>
              )}
            </div>
          </div>
        </GothicFrame>

        <div style={{ height: 12 }} />

        <GothicFrame>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontWeight: 900 }}>Perfil público</div>
            <div className="muted" style={{ fontSize: 12 }}>
              Solo enlaces opcionales: Instagram / X / Sitio web. Prohibido teléfono, WhatsApp o Telegram.
            </div>

            <label className="muted" style={{ fontSize: 12 }}>Bio</label>
            <textarea className="input" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} style={{
resize: "vertical" }} />

            <div style={{ display: "grid", gap: 10 }}>
              <label className="muted" style={{ fontSize: 12 }}>Instagram (URL)</label>
              <input className="input" value={instagram} onChange={(e) => setInstagram(e.target.value)}
placeholder="https://instagram.com/..." />

              <label className="muted" style={{ fontSize: 12 }}>X (URL)</label>
              <input className="input" value={x} onChange={(e) => setX(e.target.value)}
placeholder="https://x.com/..." />

              <label className="muted" style={{ fontSize: 12 }}>Sitio web (URL)</label>
              <input className="input" value={web} onChange={(e) => setWeb(e.target.value)}
placeholder="https://tusitio.com" />
            </div>

            {error && <div className="badge" style={{ borderColor: "rgba(255,80,80,0.35)" }}>{error}</div>}
            {okMsg && <div className="badge" style={{ borderColor: "rgba(var(--gold),0.40)" }}>{okMsg}</div>}

            <button className="btn btn--primary" onClick={save}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Guardar (demo)</strong>
              </button>
          </div>
        </GothicFrame>
      </main>
    </div>
  )
}
