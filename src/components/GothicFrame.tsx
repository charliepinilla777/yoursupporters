import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{ className?: string; innerClassName?: string; as?: "div" | "section" | "article"
}>

export default function GothicFrame({ children, className, innerClassName, as = "div" }: Props) {
  const Comp = as as any
  return (
    <Comp className={`gothic-frame ${className ?? ""}`}>
      <div className={`gothic-frame__inner ${innerClassName ?? ""}`}>{children}</div>
    </Comp>
  )
}
