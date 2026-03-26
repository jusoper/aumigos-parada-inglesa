import iconPataCoracao from '../data/images/icon-pata-coracao.png'

export default function Header() {
  return (
    <header className="header">
      <img src={iconPataCoracao} alt="Pata com coração" className="header-logo" />
      <h1 className="header-title">
        Aumigos da <span>Parada Inglesa</span>
      </h1>
      <p className="header-subtitle">
        Cachorrinhos esperando uma segunda chance. Que tal dar um lar para um deles?
      </p>
      <p className="header-footer">
        Organizado por vizinhos da Parada Inglesa para facilitar a adoção de animais da região, sem fins lucrativos.
      </p>
    </header>
  )
}
