import { useState, useEffect } from 'react'
import './Loading.css'

interface MediaLoadingProps {
  type?: 'video' | 'image' | 'content'
  size?: 'small' | 'medium' | 'large'
  text?: string
  showAfter?: number
}

export default function MediaLoading({ 
  type = 'content',
  size = 'medium',
  text,
  showAfter = 1000
}: MediaLoadingProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, showAfter)

    return () => clearTimeout(timer)
  }, [showAfter])

  if (!show) return null

  const getDefaultText = () => {
    switch (type) {
      case 'video':
        return 'CARGANDO VIDEO'
      case 'image':
        return 'CARGANDO IMAGEN'
      default:
        return 'CARGANDO'
    }
  }

  const loadingText = text || getDefaultText()
  const sizeClass = size === 'small' ? 'small' : size === 'large' ? 'large' : ''

  return (
    <div className={`media-loading-container ${sizeClass}`}>
      <div className={`loader gold ${sizeClass}`}>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="text">
          <span>{loadingText}</span>
        </div>
        <div className="line"></div>
      </div>
      
      {type === 'video' && (
        <div className="media-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      )}
      
      {type === 'image' && (
        <div className="media-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      )}
    </div>
  )
}
