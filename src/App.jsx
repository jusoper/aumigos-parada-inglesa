import { useState, useMemo } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import StatsBar from './components/StatsBar'
import DogCard from './components/DogCard'
import DogModal from './components/DogModal'
import { dogs as allDogs } from './data/dogs'

export default function App() {
  const [selectedDog, setSelectedDog] = useState(null)
  const [filters, setFilters] = useState({ status: 'todos', porte: 'todos' })

  const filteredDogs = useMemo(
    () =>
      allDogs.filter((dog) => {
        const statusMatch = filters.status === 'todos' || dog.status === filters.status
        const porteMatch = filters.porte === 'todos' || dog.porte === filters.porte
        return statusMatch && porteMatch
      }),
    [filters],
  )

  return (
    <div className="app">
      <Header />
      <StatsBar dogs={allDogs} />
      <FilterBar filters={filters} onChange={setFilters} />

      <main className="dog-grid">
        {filteredDogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} onClick={() => setSelectedDog(dog)} />
        ))}
        {filteredDogs.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p>Nenhum doguinho encontrado com esse filtro</p>
          </div>
        )}
      </main>

      {selectedDog && <DogModal dog={selectedDog} onClose={() => setSelectedDog(null)} />}
    </div>
  )
}
