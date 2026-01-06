export default function AppHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <header className="top-header">
      <div className="top-header__inner">
        <div className="top-title">{title}</div>
        {badge ? <span className="badge">{badge}</span> : <span />}
      </div>
    </header>
  )
}
