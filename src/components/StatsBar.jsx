export default function StatsBar({ dogs }) {
  const adotados = dogs.filter((d) => d.status === 'Adotado').length
  const disponiveis = dogs.filter((d) => d.status !== 'Adotado').length

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-number">{disponiveis}</span>
        <span className="stat-label">Disponíveis</span>
      </div>
      <div className="stat">
        <span className="stat-number">❤️ {adotados}</span>
        <span className="stat-label">Adotados</span>
      </div>
    </div>
  )
}
