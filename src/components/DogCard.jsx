const STATUS_CONFIG = {
  'Ainda na rua': { emoji: '🚨', label: 'Na rua', cls: 'badge-rua' },
  'Na rua': { emoji: '🚨', label: 'Na rua', cls: 'badge-rua' },
  'Lar temporário': { emoji: '🏠', label: 'Lar temporário', cls: 'badge-lar' },
  Adotado: { emoji: '🤎', label: 'Adotado', cls: 'badge-adotado' },
}

export default function DogCard({ dog, onClick }) {
  const status = STATUS_CONFIG[dog.status] || STATUS_CONFIG['Ainda na rua']
  const isAdotado = dog.status === 'Adotado'

  return (
    <div className={`dog-card${isAdotado ? ' adotado' : ''}`} onClick={onClick}>
      <div className="dog-card-photo">
        <img src={dog.fotos[0]} alt={dog.nome} loading="lazy" />
        <span className={`dog-card-badge ${status.cls}`}>
          {status.emoji} {status.label}
        </span>
        {isAdotado && (
          <div className="dog-card-adopted-overlay">
            <span className="dog-card-adopted-text">Adotado 🤎</span>
          </div>
        )}
      </div>
      <div className="dog-card-body">
        <div className="dog-card-name">{dog.nome}</div>
        <div className="dog-card-info">
          {dog.sexo} · {dog.idade} · Porte {dog.porte}
        </div>
        <p className="dog-card-desc">{dog.descricao}</p>
      </div>
    </div>
  )
}
