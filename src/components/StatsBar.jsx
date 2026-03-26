export default function StatsBar({ dogs }) {
  const adotados = dogs.filter((d) => d.status === 'Adotado').length
  const disponiveis = dogs.filter((d) => d.status !== 'Adotado').length
  const naRua = dogs.filter((d) => d.status === 'Ainda na rua').length

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-number">{disponiveis}</span>
        <span className="stat-label">Disponíveis</span>
      </div>
      <div className="stat">
        <span className="stat-number">{naRua}</span>
        <span className="stat-label">Na rua</span>
      </div>
      <div className="stat">
        <span className="stat-number">❤️ {adotados}</span>
        <span className="stat-label">Adotados</span>
      </div>
      <div className="stat">
        <span className="stat-number">{dogs.length}</span>
        <span className="stat-label">Total</span>
      </div>
    </div>
  )
}
