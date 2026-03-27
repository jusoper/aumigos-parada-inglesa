import { useState, useEffect, useRef } from 'react'
import ShareCard from './ShareCard'

const STATUS_CONFIG = {
  'Ainda na rua': { emoji: '🚨', label: 'Ainda na rua', color: '#e07b39' },
  'Lar temporário': { emoji: '🏠', label: 'Lar temporário', color: '#6b8f71' },
  'Na rua': { emoji: '🚨', label: 'Na rua', color: '#e07b39' },
  Adotado: { emoji: '🤎', label: 'Adotado', color: '#A0826D' },
}

const VACINADO_LABEL = {
  Sim: '✅ Vacinado',
  Não: '❌ Não vacinado',
  Desconhecido: '❓ Desconhecido',
}

const CASTRADO_LABEL = {
  Sim: '✅ Castrado',
  Não: '❌ Não castrado',
  Desconhecido: '❓ Desconhecido',
}

export default function DogModal({ dog, onClose }) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [showShare, setShowShare] = useState(false)
  const modalRef = useRef(null)

  const status = STATUS_CONFIG[dog.status] || STATUS_CONFIG['Ainda na rua']

  // Scroll para o topo quando o modal abrir
  useEffect(() => {
    // Bloquear scroll do body em mobile
    document.body.style.overflow = 'hidden'
    
    // Garantir que o modal comece do topo após a animação
    const scrollTimer = setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.scrollTop = 0
        modalRef.current.scrollTo({ top: 0, behavior: 'auto' })
      }
    }, 50) // Pequeno delay para garantir que a animação iniciou
    
    return () => {
      document.body.style.overflow = ''
      clearTimeout(scrollTimer)
    }
  }, [])

  const whatsappMsg = encodeURIComponent(
    `Oi! Vi o ${dog.nome} no Aumigos da Parada Inglesa e tenho interesse em adotar 🐶`,
  )
  const whatsappUrl = `https://wa.me/${dog.responsavel_whatsapp}?text=${whatsappMsg}`

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>

          <div className="modal-body">
            {/* Status */}
            <span
              className="modal-status-badge"
              style={{ background: status.color }}
            >
              {status.emoji} {status.label}
            </span>

            {/* Nome */}
            <h2 className="modal-name">{dog.nome}</h2>

            {/* Aguardando há */}
            <p className="modal-wait">⏳ Aguardando há {dog.tempo_espera}</p>

            {/* Fotos em quadrado */}
            <div className="photo-gallery-grid">
              {dog.fotos.map((foto, i) => (
                <div
                  key={i}
                  className={`photo-grid-item${currentPhoto === i ? ' active' : ''}`}
                  onClick={() => setCurrentPhoto(i)}
                >
                  <img src={foto} alt={`${dog.nome} foto ${i + 1}`} />
                </div>
              ))}
            </div>

            {/* Details grid */}
            <div className="modal-details">
              <div className="detail-item">
                <span className="detail-label">Sexo</span>
                <span className="detail-value">
                  {dog.sexo === 'Macho' ? '♂️' : '♀️'} {dog.sexo}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Idade</span>
                <span className="detail-value">{dog.idade}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Porte</span>
                <span className="detail-value">{dog.porte}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Temperamento</span>
                <span className="detail-value">{dog.temperamento}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Vacinação</span>
                <span className="detail-value">{VACINADO_LABEL[dog.vacinado] ?? dog.vacinado}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Castração</span>
                <span className="detail-value">{CASTRADO_LABEL[dog.castrado] ?? dog.castrado}</span>
              </div>
            </div>

            {/* Description */}
            <p className="modal-desc">{dog.descricao}</p>

            {/* Responsável */}
            <div className="modal-responsavel">
              <div className="responsavel-avatar">{dog.responsavel_nome[0]}</div>
              <div className="responsavel-info">
                <small>Responsável</small>
                <strong>{dog.responsavel_nome}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              {dog.status !== 'Adotado' && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  💬 Falar no WhatsApp
                </a>
              )}
              <button className="btn-share" onClick={() => setShowShare(true)}>
                📲 Gerar imagem para compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showShare && <ShareCard dog={dog} onClose={() => setShowShare(false)} />}
    </>
  )
}
