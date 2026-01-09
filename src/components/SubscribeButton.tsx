import { useState } from "react"
import "./SubscribeButton.css"

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
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (isSubscribed) return
    setIsClicked(true)
    setTimeout(() => {
      onSubscribe()
      setIsClicked(false)
    }, 600)
  }

  return (
    <div className="subscribe-switch-container">
      <style>{`
        .subscribe-switch {
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
        }

        .subscribe-switch-wrapper {
          position: relative;
          width: 160px;
          height: 200px;
          background-color: #0a0a0e;
          box-shadow: 
            0 0 15px 3px rgba(212,175,55,0.15),
            0 0 1px 2px rgba(0,0,0,0.8),
            inset 0 2px 2px -2px rgba(255,255,255,0.1),
            inset 0 0 2px 15px #1a1a22,
            inset 0 0 2px 22px #0a0a0e;
          border-radius: 8px;
          padding: 20px;
          transition: box-shadow 0.3s ease;
        }

        .subscribe-switch-wrapper.active {
          box-shadow: 
            0 -15px 30px rgba(212,175,55,0.4),
            0 0 1px 2px rgba(0,0,0,0.8),
            inset 0 2px 2px -2px rgba(255,255,255,0.1),
            inset 0 0 2px 15px #1a1a22,
            inset 0 0 2px 22px #0a0a0e;
        }

        .subscribe-button-3d {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #d4af37 0%, #a68f2f 50%, #8b7c2d 100%);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          transition: all 0.4s cubic-bezier(1, 0, 1, 1);
          transform-style: preserve-3d;
          transform: translateZ(20px) rotateX(-25deg);
          transform-origin: center center -20px;
          font-weight: 900;
          font-size: 12px;
          color: #0a0a0e;
          letter-spacing: 1px;
          text-transform: uppercase;
          overflow: hidden;
        }

        .subscribe-button-3d::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.2) 40%,
            transparent 100%
          );
          transform-origin: top;
          transform: rotateX(-90deg);
          transform-style: preserve-3d;
        }

        .subscribe-button-3d::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(180deg, #8b7c2d, #5a5520);
          transform-origin: bottom;
          transform: translateY(50%) rotateX(-90deg);
          transform-style: preserve-3d;
          box-shadow: 0 50px 15px -5px rgba(0, 0, 0, 0.8);
        }

        .subscribe-button-3d .shine {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            transparent 50%
          );
          opacity: 0.3;
          transition: opacity 0.3s cubic-bezier(1, 0, 1, 1);
          pointer-events: none;
        }

        .subscribe-button-3d .light {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            circle at center,
            rgba(255, 215, 0, 0.8),
            rgba(212, 175, 55, 0.4) 40%,
            transparent 70%
          );
          opacity: 0;
          animation: light-off 1s forwards;
          pointer-events: none;
        }

        .subscribe-button-3d .shadow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.6));
          opacity: 1;
          transition: opacity 0.3s cubic-bezier(1, 0, 1, 1);
          pointer-events: none;
        }

        .subscribe-wrapper.active .subscribe-button-3d {
          transform: translateZ(20px) rotateX(30deg);
          box-shadow: 0 -15px 40px rgba(212,175,55,0.5);
        }

        .subscribe-wrapper.active .subscribe-button-3d .light {
          animation: flicker 0.2s infinite 0.3s;
        }

        .subscribe-wrapper.active .subscribe-button-3d .shine {
          opacity: 1;
        }

        .subscribe-wrapper.active .subscribe-button-3d .shadow {
          opacity: 0;
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes light-off {
          0% { opacity: 1; }
          80% { opacity: 0; }
          100% { opacity: 1; }
        }

        .subscribe-label {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: rgba(230, 200, 110, 1);
          white-space: nowrap;
          letter-spacing: 0.5px;
        }

        .subscribe-wrapper.subscribed .subscribe-button-3d {
          background: linear-gradient(180deg, #666 0%, #444 50%, #333 100%);
          color: rgba(167, 171, 180, 0.7);
          cursor: default;
          opacity: 0.6;
        }

        .subscribe-wrapper.subscribed .subscribe-button-3d::after {
          background: linear-gradient(180deg, #444, #222);
        }
      `}</style>

      <div className={`subscribe-switch-wrapper ${isClicked ? "active" : ""}`}>
        <div className={`subscribe-wrapper ${isClicked ? "active" : ""} ${isSubscribed ? "subscribed" : ""}`}>
          <button
            className="subscribe-button-3d"
            onClick={handleClick}
            disabled={isSubscribed}
            title={isSubscribed ? `Suscrita a ${creatorName}` : `Suscribirse a ${creatorName} ($${price}/mes)`}
          >
            <div className="shine"></div>
            <div className="light"></div>
            <div className="shadow"></div>
            <span style={{ position: "relative", zIndex: 10 }}>
              {isSubscribed ? "✓" : "ACTIVAR"}
            </span>
          </button>
        </div>
      </div>

      <div className="subscribe-label">
        {isSubscribed ? `✓ Suscrita ($${price}/mes)` : `Suscribirse ($${price}/mes)`}
      </div>
    </div>
  )
}
