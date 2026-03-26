import { useRef } from 'react'
import { toPng } from 'html-to-image'

const STATUS_CONFIG = {
  'Ainda na rua': { emoji: '🚨', label: 'Ainda na rua', color: '#dc2626' },
  'Lar temporário': { emoji: '🏠', label: 'Lar temporário', color: '#16a34a' },
  Adotado: { emoji: '❤️', label: 'Adotado', color: '#db2777' },
}

// All styles are inline so html-to-image captures them correctly
export default function ShareCard({ dog, onClose }) {
  const cardRef = useRef(null)
  const status = STATUS_CONFIG[dog.status] || STATUS_CONFIG['Ainda na rua']

  const vacinadoText =
    dog.vacinado === 'Sim'
      ? 'Vacinado ✓'
      : dog.vacinado === 'Não'
        ? 'Não vacinado'
        : 'Vacinação desconhecida'

  const castradoText =
    dog.castrado === 'Sim'
      ? 'Castrado ✓'
      : dog.castrado === 'Não'
        ? 'Não castrado'
        : 'Castração desconhecida'

  const bullets = [dog.temperamento, vacinadoText, castradoText]

  async function handleDownload() {
    if (!cardRef.current) return
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = `${dog.nome}-aumigos.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Erro ao gerar imagem:', err)
      alert('Não foi possível gerar a imagem. Tente novamente.')
    }
  }

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-container" onClick={(e) => e.stopPropagation()}>
        <p className="share-title">Prévia da imagem para compartilhar</p>

        {/* Card template — captured by html-to-image */}
        <div
          ref={cardRef}
          style={{
            width: '360px',
            background: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            fontFamily: 'Nunito, Arial, sans-serif',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            border: '1px solid #e4e4e7',
          }}
        >
          {/* Brand header */}
          <div
            style={{
              background: '#18181b',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '20px' }}>🐶</span>
            <span
              style={{
                color: 'white',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '0.3px',
              }}
            >
              Aumigos da Parada Inglesa
            </span>
          </div>

          {/* Photo */}
          <div style={{ position: 'relative', width: '100%', height: '280px' }}>
            <img
              src={dog.fotos[0]}
              alt={dog.nome}
              crossOrigin="anonymous"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Status badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: status.color,
                color: 'white',
                padding: '3px 10px',
                borderRadius: '5px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2px',
              }}
            >
              {status.emoji} {status.label}
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: '18px 20px 24px' }}>
            <div
              style={{
                fontSize: '30px',
                fontWeight: 800,
                color: '#18181b',
                marginBottom: '4px',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              {dog.nome}
            </div>
            <div
              style={{
                color: '#71717a',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              {dog.sexo} · {dog.idade} · Porte {dog.porte}
            </div>

            {/* Bullets */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}
            >
              {bullets.map((text, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#52525b' }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#ea580c',
                      flexShrink: 0,
                    }}
                  />
                  {text}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                background: '#18181b',
                borderRadius: '8px',
                padding: '13px',
                textAlign: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '16px',
                letterSpacing: '0.2px',
              }}
            >
              Procura um lar ❤️
            </div>
          </div>
        </div>

        <div className="share-actions">
          <button className="btn-download" onClick={handleDownload}>
            ⬇️ Baixar imagem
          </button>
          <button className="btn-close-share" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
