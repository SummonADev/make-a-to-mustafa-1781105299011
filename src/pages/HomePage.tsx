import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';
import { CheckSquare } from 'lucide-react';

export default function HomePage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <CheckSquare className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              My Todos
            </h1>
          </div>
          <p className="text-gray-500">
            Stay organized. Get things done.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl bg-white shadow-xl shadow-indigo-200/40">
          {/* Input */}
          <div className="border-b border-gray-100 p-6">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filters */}
          <div className="border-b border-gray-100 px-6 py-3">
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          </div>

          {/* List */}
          <div className="p-6">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Data is saved in your browser&apos;s localStorage.
        </p>
      </div>
    </div>
  );
}