import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { api, type Creator } from "../lib/api"
import GothicFrame from "../components/GothicFrame"
import LanguageSwitcher from "../components/LanguageSwitcher"
import Loading from "../components/Loading"

export default function Explore() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadCreators()
  }, [search, page])

  const loadCreators = async () => {
    try {
      setLoading(true)
      const response = await api.getCreators({ search, page, limit: 10 })
      setCreators(response.creators || [])
    } catch (error) {
      console.error('Error loading creators:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="screen">
      <GothicFrame>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>Explorar Creadoras</div>
          <LanguageSwitcher />
          
          <input
            className="input"
            placeholder="Buscar creadoras..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            style={{ marginBottom: 10 }}
          />

          {loading ? (
            <Loading text="CARGANDO" />
          ) : creators.length === 0 ? (
            <div style={{ textAlign: "center", padding: 20 }}>
              No se encontraron creadoras
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {creators.map((creator) => (
                <Link key={creator._id} to={`/creator/${creator._id}`}>
                  <GothicFrame>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "auto 1fr auto", 
                      gap: 10, 
                      alignItems: "center" 
                    }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: "50%", 
                        background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold"
                      }}>
                        {creator.username.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ display: "grid", gap: 2 }}>
                        <div style={{ fontWeight: 800 }}>{creator.username}</div>
                        <div className="muted" style={{ fontSize: 12 }}>
                          {creator.profile.bio}
                        </div>
                        <div style={{ fontSize: 12 }}>
                          {creator.subscriberCount || 0} suscriptores • ${creator.subscriptionPrice || 9.99}/mes
                        </div>
                      </div>
                      <div style={{ display: "grid", gap: 4 }}>
                        {creator.verificationStatus === "approved" && (
                          <div className="badge" style={{ fontSize: 10 }}>
                            ✅ Verificada
                          </div>
                        )}
                        {creator.isSubscribed && (
                          <div className="badge" style={{ fontSize: 10 }}>
                            ⭐ Suscrita
                          </div>
                        )}
                      </div>
                    </div>
                  </GothicFrame>
                </Link>
              ))}
            </div>
          )}
        </div>
      </GothicFrame>
    </div>
  )
}
