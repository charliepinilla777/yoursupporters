import { useLocation, useNavigate } from 'react-router-dom'
import { IconCompass, IconChat, IconUser, IconPlay, IconPhoto } from './icons'

export default function BottomTabs() {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    { path: '/explore', icon: <IconCompass />, label: 'Explorar' },
    { path: '/videos',  icon: <IconPlay />,    label: 'Videos' },
    { path: '/photos',  icon: <IconPhoto />,   label: 'Fotos' },
    { path: '/chat',    icon: <IconChat />,    label: 'Mensajes' },
    { path: '/dashboard', icon: <IconUser />,  label: 'Perfil' },
  ]

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <nav
      aria-label="Navegación principal"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        background: 'rgba(8, 8, 14, 0.95)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '1px solid rgba(180, 79, 255, 0.18)',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: 30,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.path)
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            aria-label={tab.label}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: '1 1 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? '#FF2D78' : '#9B95B8',
              padding: '6px 2px',
              position: 'relative',
              transition: 'color 0.18s ease',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {tab.icon}
            </div>
            <span style={{ fontSize: 9, fontWeight: active ? 700 : 400, letterSpacing: 0.2, lineHeight: 1 }}>
              {tab.label}
            </span>
            {active && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 5,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#FF2D78',
                  boxShadow: '0 0 6px #FF2D78',
                }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
