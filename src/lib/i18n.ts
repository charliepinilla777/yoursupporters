export type Locale = "es" | "en"

export const messages = {
  es: { explore: "Explorar", subs: "Suscripciones", inbox: "Inbox", profile: "Perfil", dashboard: "Dashboard",
language: "Idioma" },
  en: { explore: "Explore", subs: "Subscriptions", inbox: "Inbox", profile: "Profile", dashboard: "Dashboard",
language: "Language" },
} as const

export function t(locale: Locale, key: keyof typeof messages.es) {
  return messages[locale][key]
}
