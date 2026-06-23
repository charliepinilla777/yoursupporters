import type { SVGProps } from "react"

export function IconCompass(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14.6 9.4 13 13l-3.6 1.6L11 11l3.6-1.6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 6.5v1.5M12 16v1.5M6.5 12H8M16 12h1.5" stroke="currentColor" strokeWidth="1.8"
strokeLinecap="round"/>
    </svg>
  )
}

export function IconStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m12 3.5 2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.8l6-.9L12 3.5Z" stroke="currentColor"
strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 18.5 3.8 21V6.8C3.8 5.3 5 4 6.6 4h10.8C19 4 20.2 5.3 20.2 6.8v7.8c0 1.5-1.2 2.8-2.6 2.8H7Z"
stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7.5 9.2h9M7.5 12.2h6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconUser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 12.2a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 20c1.4-3.3 4.2-5.1 7.5-5.1S18.1 16.7 19.5 20" stroke="currentColor" strokeWidth="1.8"
strokeLinecap="round" />
    </svg>
  )
}

export function IconPlay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon fill="currentColor" stroke="none" points="10,8 16,12 10,16" />
    </svg>
  )
}

export function IconPhoto(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <polyline points="21,15 16,10 5,21" />
    </svg>
  )
}
