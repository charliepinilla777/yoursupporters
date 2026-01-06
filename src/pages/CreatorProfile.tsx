import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import GothicFrame from "../components/GothicFrame"
import AppHeader from "../components/AppHeader"
import Loading from "../components/Loading"
import MediaLoading from "../components/MediaLoading"
import { useAuth } from "../contexts/AuthContext"
import { api, type Creator } from "../lib/api"

const demoPosts = [
  { id: "p1", title: "Editorial Noir", locked: true, type: "foto" as const },
  { id: "p2", title: "Behind the Scenes", locked: true, type: "video" as const },
  { id: "p3", title: "Set Dorado", locked: false, type: "foto" as const },
  { id: "p4", title: "Cinematic", locked: true, type: "video" as const },
]

const mediaBg = `radial-gradient(60% 60% at 30% 20%, rgba(212,175,55,0.10), transparent 60%),
linear-gradient(180deg, rgba(255,255,255,0.05), transparent)`

export default function CreatorProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    if (id) {
      loadCreator(id)
    }
  }, [id])

  const loadCreator = async (creatorId: string) => {
    try {
      setLoading(true)
      const response = await api.getCreator(creatorId)
      setCreator(response.creator)
      setSubscribed(response.creator?.subscribers?.includes(user?._id || '') || false)
    } catch (error) {
      console.error('Error loading creator:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!id || !user) return
    
    try {
      if (subscribed) {
        await api.unsubscribe(id)
        setSubscribed(false)
      } else {
        await api.subscribe(id)
        setSubscribed(true)
      }
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  if (loading) {
    return (
      <div className="screen">
        <AppHeader title="PERFIL" />
        <Loading text="CARGANDO" />
      </div>
    )
  }

  const creatorName = creator?.username || "Creadora"

  return (
    <div className="app-shell">
      <AppHeader title={creatorName} badge={subscribed ? "Suscrita" : "Vista previa"} />

      <main className="screen">
        <GothicFrame>
          <div className="muted" style={{ fontSize: 12 }}>
            Solo contenido digital. Prohibido coordinar encuentros presenciales o contacto directo.
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            {!subscribed ? (
              <button className="btn btn--primary" onClick={handleSubscribe}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Suscribirme</strong>
              </button>
            ) : (
              <button className="btn btn--ghost" onClick={handleSubscribe}>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
                <strong>Cancelar suscripción</strong>
              </button>
            )}
            <Link to="/chat" className="btn" style={{ textDecoration: "none" }}>
              <div id="container-stars">
                <div id="stars"></div>
              </div>
              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
              <strong>Ir a Inbox</strong>
            </Link>
          </div>

          {!subscribed && (
            <div className="badge" style={{ display: "inline-flex", alignSelf: "flex-start", marginTop: 10 }}>
              Contenido bloqueado: vista previa borrosa
            </div>
          )}
        </GothicFrame>

        <div style={{ height: 12 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {demoPosts.map((p) => {
            const locked = p.locked && !subscribed
            return (
              <GothicFrame key={p.id} as="article">
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontWeight: 800, fontSize: 13 }}>{p.title}</div>
                    <span className="badge">{p.type}</span>
                  </div>

                  <div
                    style={{
                      height: 140,
                      borderRadius: 14,
                      border: "1px solid rgba(var(--gold),0.18)",
                      background: "rgba(var(--surface-2),1)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Loading para contenido multimedia */}
                    <MediaLoading 
                      type={p.type === 'video' ? 'video' : 'image'} 
                      size="small" 
                      showAfter={800}
                    />
                    
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: mediaBg,
                        filter: locked ? "blur(10px)" : "none",
                        transform: locked ? "scale(1.06)" : "none",
                      }}
                    />
                    {locked && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 800,
                          textAlign: "center",
                          padding: 10,
                          background: "rgba(11,11,15,0.35)",
                        }}
                      >
                        Suscríbete para ver
                      </div>
                    )}
                  </div>
                </div>
              </GothicFrame>
            )
          })}
        </div>
      </main>
    </div>
  )
}
