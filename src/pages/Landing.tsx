import { Link } from "react-router-dom"
import GothicFrame from "../components/GothicFrame"
import AppHeader from "../components/AppHeader"

export default function Landing() {
  return (
    <div className="app-shell">
      <AppHeader title="Gilded Noir" badge="Mobile-first" />
      <main className="screen">
        <GothicFrame>
          <h1 style={{ margin: 0, fontSize: 22 }}>Suscripciones para creadoras</h1>
          <p className="muted" style={{ marginTop: 10 }}>
            Contenido <strong>digital</strong> (fotos y videos) + chat in-app.
          </p>

          <div className="divider" style={{ margin: "14px 0" }} />

          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Explora creadoras y desbloquea contenido por suscripción.</li>
            <li>Chat 1:1 (solo fans suscritos).</li>
            <li>Verificación 18+ requerida antes de publicar (demo).</li>
          </ul>

          <div className="divider" style={{ margin: "14px 0" }} />

          <div style={{ display: "grid", gap: 10 }}>
            <Link to="/explore" className="btn btn--primary" style={{ textAlign: "center", textDecoration: "none" }}>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <strong>Entrar a Explorar</strong>
            </Link>
            <Link to="/dashboard" className="btn btn--ghost" style={{ textAlign: "center", textDecoration: "none" }}>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <strong>Ir a Perfil / Dashboard (demo)</strong>
            </Link>
          </div>

          <p className="muted" style={{ marginTop: 14, fontSize: 12 }}>
            Reglas: prohibido coordinar encuentros/servicios sexuales presenciales. Prohibido publicar
teléfono/WhatsApp/Telegram.
          </p>
        </GothicFrame>
      </main>
    </div>
  )
}
