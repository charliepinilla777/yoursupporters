import { useState, useEffect } from 'react'

/* From Uiverse.io by andrew-manzyk */
import './Loading.css'

interface LoadingProps {
  text?: string
  showAfter?: number
  minDuration?: number
}

export default function Loading({ 
  text = "LOADING", 
  showAfter = 1000,
  minDuration = 500 
}: LoadingProps) {
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShow(true)
    }, showAfter)

    return () => clearTimeout(showTimer)
  }, [showAfter])

  useEffect(() => {
    if (show) {
      const hideTimer = setTimeout(() => {
        setHide(true)
      }, minDuration)

      return () => clearTimeout(hideTimer)
    }
  }, [show, minDuration])

  if (!show || hide) return null

  return (
    <div className="loading-container">
      <div className="loader">
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="text">
          <span>{text}</span>
        </div>
        <div className="line"></div>
      </div>
    </div>
  )
}
