import { NavLink } from "react-router-dom"
import { useDemoSession } from "./DemoSession"
import { IconChat, IconCompass, IconStar, IconUser } from "./icons"
import LanguageSwitcher from "./LanguageSwitcher"
import { t } from "../lib/i18n"

function Tab({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  return (
    <NavLink to={to} className={({ isActive }) => `tab-btn ${isActive ? "tab-btn--active" : ""}`}>
      <div className="tab-btn__icon">{icon}</div>
      <div className="tab-btn__label">{label}</div>
    </NavLink>
  )
}

export default function BottomTabs() {
  const { user, locale } = useDemoSession()
  const isCreator = user.role === "model"
  const fourthLabel = isCreator ? t(locale, "dashboard") : t(locale, "profile")

  return (
    <>
      <LanguageSwitcher />
      <nav className="bottom-tabs" aria-label="Navegación principal">
        <div className="bottom-tabs__inner">
          <Tab to="/explore" label={t(locale, "explore")} icon={<IconCompass />} />
          <Tab to="/dashboard?tab=subs" label={t(locale, "subs")} icon={<IconStar />} />
          <Tab to="/chat" label={t(locale, "inbox")} icon={<IconChat />} />
          <Tab to="/dashboard" label={fourthLabel} icon={<IconUser />} />
        </div>
      </nav>
    </>
  )
}
