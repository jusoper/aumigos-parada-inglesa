const STATUS_OPTIONS = [
  { value: 'todos', label: 'Todos' },
  { value: 'Ainda na rua', label: '🚨 Na rua' },
  { value: 'Na rua', label: '🚨 Na rua' },
  { value: 'Lar temporário', label: '🏠 Lar temp.' },
  { value: 'Adotado', label: '🤎 Adotados' },
]

const PORTE_OPTIONS = [
  { value: 'todos', label: 'Todos' },
  { value: 'Pequeno', label: 'Pequeno' },
  { value: 'Médio', label: 'Médio' },
  { value: 'Grande', label: 'Grande' },
]

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Status</span>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`filter-btn${filters.status === opt.value ? ' active' : ''}`}
            onClick={() => onChange({ ...filters, status: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="filter-group">
        <span className="filter-label">Porte</span>
        {PORTE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`filter-btn${filters.porte === opt.value ? ' active' : ''}`}
            onClick={() => onChange({ ...filters, porte: opt.value })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
