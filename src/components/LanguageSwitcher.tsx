import { useState } from "react"

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState("es")
  const next = locale === "es" ? "en" : "es"

  return (
    <div className="lang-switch" aria-label="Cambiar idioma">
      <button type="button" onClick={() => setLocale(next)} title="Cambiar idioma" className="btn">
        <div id="container-stars">
          <div id="stars"></div>
        </div>
        <div id="glow">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <strong>Idioma: {locale.toUpperCase()}</strong>
      </button>
    </div>
  )
}
