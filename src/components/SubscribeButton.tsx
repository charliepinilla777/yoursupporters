import { useState } from "react"

type SubscribeButtonProps = {
  creatorName: string
  price?: number
  onSubscribe: () => void
  isSubscribed?: boolean
}

export default function SubscribeButton({
  creatorName,
  price = 5,
  onSubscribe,
  isSubscribed = false,
}: SubscribeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onSubscribe()
      setIsAnimating(false)
    }, 300)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isAnimating || isSubscribed}
      style={{
        position: "relative",
        minHeight: 56,
        width: "100%",
        padding: "16px 24px",
        borderRadius: 16,
        border: "2px solid rgba(var(--gold), 0.55)",
        background: isSubscribed
          ? "rgba(var(--surface-2), 0.5)"
          : "linear-gradient(135deg, rgba(var(--gold), 0.95), rgba(var(--gold-soft), 0.85))",
        color: isSubscribed ? "rgba(var(--text), 0.6)" : "rgb(10 10 12)",
        fontWeight: 800,
        fontSize: 16,
        letterSpacing: 0.5,
        cursor: isSubscribed ? "default" : "pointer",
        transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: isSubscribed
          ? "0 4px 12px rgba(0,0,0,0.2)"
          : "0 10px 30px rgba(212,175,55,0.25)",
        transform: isAnimating ? "scale(0.95)" : "scale(1)",
      }}
      title={isSubscribed ? `Suscrita a ${creatorName}` : `Suscribirse a ${creatorName} ($${price}/mes)`}
    >
      {!isSubscribed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(255,255,255,0.3), transparent 60%)",
            pointerEvents: "none",
          }}
        />
      )}

      <span style={{ position: "relative", zIndex: 2 }}>
        {isSubscribed ? "✓ Suscrita ($5/mes)" : `Suscribirse ($${price}/mes)`}
      </span>
    </button>
  )
}
