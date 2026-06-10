import type { FilterType } from '@/types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.value
                ? 'bg-indigo-600 text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>{activeCount} left</span>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-red-400 transition-colors hover:text-red-600"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}