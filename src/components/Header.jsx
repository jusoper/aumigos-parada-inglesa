import iconPataCoracao from '../data/images/icon-pata-coracao.png'

export default function Header() {
  return (
    <header className="header">
      <img src={iconPataCoracao} alt="Pata com coração" className="header-logo" />
      <h1 className="header-title">
        Aumigos da <span>Parada Inglesa</span>
      </h1>
      <p className="header-subtitle">
        Adote um amigo de quatro patas!
      </p>
      <p className="header-footer">
        Iniciativa sem fins lucrativos dos vizinhos da Parada Inglesa
      </p>
    </header>
  )
}
