import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Role = "user" | "model" | "admin" | "supervisor"
export type VerificationStatus = "pending" | "approved" | "rejected"

export type DemoUser = { id: string; username: string; role: Role; verification_status: VerificationStatus }

type Subscription = { creatorId: string; since: string }

type DemoState = {
  locale: "es" | "en"
  setLocale: (l: "es" | "en") => void
  user: DemoUser
  setRole: (r: Role) => void
  setVerificationStatus: (s: VerificationStatus) => void
  subscriptions: Subscription[]
  isSubscribedTo: (creatorId: string) => boolean
  subscribeTo: (creatorId: string) => void
  unsubscribeFrom: (creatorId: string) => void
}

const LS_KEY = "gilded_noir_demo_state_v1"
const Ctx = createContext<DemoState | null>(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) throw new Error("no state")
    const p = JSON.parse(raw)
    return {
      locale: p.locale === "en" ? "en" : "es",
      user: p.user ?? { id: "u_demo", username: "fan_noir", role: "user", verification_status: "pending" },
      subscriptions: Array.isArray(p.subscriptions) ? p.subscriptions : [],
    }
  } catch {
    return { locale: "es" as const, user: { id: "u_demo", username: "fan_noir", role: "user" as const,
verification_status: "pending" as const }, subscriptions: [] as Subscription[] }
  }
}

export function DemoSessionProvider({ children }: React.PropsWithChildren) {
  const initial = useMemo(() => loadInitial(), [])
  const [locale, setLocaleState] = useState<"es" | "en">(initial.locale as "es" | "en")
  const [user, setUser] = useState<DemoUser>(initial.user)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initial.subscriptions)

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ locale, user, subscriptions }))
  }, [locale, user, subscriptions])

  const setLocale = (l: "es" | "en") => setLocaleState(l)
  const setRole = (r: Role) => setUser((u) => ({ ...u, role: r }))
  const setVerificationStatus = (s: VerificationStatus) => setUser((u) => ({ ...u, verification_status: s }))

  const isSubscribedTo = (creatorId: string) => subscriptions.some((s) => s.creatorId === creatorId)
  const subscribeTo = (creatorId: string) => {
    setSubscriptions((prev) => (prev.some((s) => s.creatorId === creatorId) ? prev : [...prev, { creatorId, since:
new Date().toISOString() }]))
  }
  const unsubscribeFrom = (creatorId: string) => setSubscriptions((prev) => prev.filter((s) => s.creatorId !==
creatorId))

  const value: DemoState = { locale, setLocale, user, setRole, setVerificationStatus, subscriptions,
isSubscribedTo, subscribeTo, unsubscribeFrom }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemoSession() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useDemoSession debe usarse dentro de DemoSessionProvider")
  return ctx
}
