import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { api, type Creator } from "../lib/api"
import GothicFrame from "../components/GothicFrame"
import AppHeader from "../components/AppHeader"
import Loading from "../components/Loading"

export default function Explore() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadCreators()
  }, [search])

  const loadCreators = async () => {
    try {
      setLoading(true)
      const response = await api.getCreators({ search, limit: 10 })
      setCreators((response as any).data || [])
    } catch (error) {
      console.error('Error loading creators:', error)
      setCreators([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <AppHeader title="Explorar" badge={`${creators.length} creadoras`} />
      
      <main className="screen">
        <GothicFrame>
          <label className="muted" style={{ fontSize: 12 }}>
            Buscar por nombre o tags
          </label>
          <input
            className="input"
            placeholder="Ej: luna, gótico, video..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginTop: 8 }}
          />
        </GothicFrame>

        <div style={{ height: 12 }} />

        {loading ? (
          <Loading text="CARGANDO" />
        ) : creators.length === 0 ? (
          <GothicFrame>
            <div style={{ textAlign: "center", padding: 20 }}>
              No se encontraron creadoras con "{search}"
            </div>
          </GothicFrame>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {creators.map((creator) => (
              <GothicFrame key={creator._id} as="article">
                <Link to={`/creator/${creator.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "auto 1fr auto", 
                    gap: 12, 
                    alignItems: "center" 
                  }}>
                    <div style={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: "50%", 
                      background: "linear-gradient(45deg, rgba(212,175,55,0.8), rgba(230,200,110,0.6))",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 900,
                      fontSize: 18
                    }}>
                      👑
                    </div>
                    <div style={{ display: "grid", gap: 6 }}>
                      <div style={{ fontWeight: 800, fontSize: 15 }}>{creator.name}</div>
                      <div className="muted" style={{ fontSize: 12 }}>
                        {creator.profile.bio}
                      </div>
                      <div style={{ fontSize: 11, display: "flex", gap: 8 }}>
                        <span>👥 {creator.followers?.toLocaleString() || 0}</span>
                        <span>💰 ${creator.subscriptionPrice || 5}/mes</span>
                      </div>
                      {creator.tags && creator.tags.length > 0 && (
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
                          {creator.tags.map((tag) => (
                            <span key={tag} className="badge" style={{ fontSize: 10 }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ display: "grid", gap: 4 }}>
                      {creator.verificationStatus === "approved" && (
                        <div className="badge" style={{ fontSize: 10, whiteSpace: "nowrap" }}>
                          ✅ Verificada
                        </div>
                      )}
                      {creator.isSubscribed && (
                        <div className="badge" style={{ fontSize: 10, whiteSpace: "nowrap" }}>
                          ⭐ Suscrita
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </GothicFrame>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
