const phoneLoose = /(\+?\d[\d\s().-]{7,}\d)/

const forbiddenWords = [
  "whatsapp",
  "wa.me",
  "telegram",
  "t.me",
  "tel:",
  "llámame",
  "llamame",
  "número",
  "numero",
  "phone",
  "dm me",
  "contáctame",
  "contactame",
  "escort",
  "escorta",
  "prostitución",
  "prostitucion",
  "servicio",
  "encuentro",
  "cita",
  "hotel",
  "en persona",
  "presencial",
]

export function containsForbiddenContact(text: string) {
  const t = (text || "").toLowerCase()
  if (phoneLoose.test(t)) return true
  return forbiddenWords.some((w) => t.includes(w))
}

export function isProbablyPhoneNumber(value: string) {
  const v = (value || "").trim()
  if (!v) return false
  return phoneLoose.test(v) || /wa\.me\/\d+/.test(v) || /t\.me\/\+?\d+/.test(v)
}

export function validateSocialUrl(url: string) {
  const trimmed = (url || "").trim()
  if (!trimmed) return { ok: true as const }

  if (isProbablyPhoneNumber(trimmed) || containsForbiddenContact(trimmed)) {
    return {
      ok: false as const,
      error: "No se permite publicar teléfonos, WhatsApp o Telegram. Usa solo enlaces (Instagram/X/Sitio web).",
    }
  }

  try {
    const u = new URL(trimmed)
    if (!["http:", "https:"].includes(u.protocol)) {
      return { ok: false as const, error: "El enlace debe empezar por http:// o https://." }
    }
    return { ok: true as const }
  } catch {
    return { ok: false as const, error: "Enlace inválido." }
  }
}
