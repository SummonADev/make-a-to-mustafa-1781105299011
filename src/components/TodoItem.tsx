import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import type { Todo } from '@/types/todo';
import { Trash2, Pencil, Check, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setEditValue(todo.text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditValue(todo.text);
  };

  const commitEdit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <li
      className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
        todo.completed
          ? 'border-green-100 bg-green-50/60'
          : 'border-gray-100 bg-white hover:border-indigo-100 hover:bg-indigo-50/30'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          todo.completed
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-gray-300 hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check className="h-4 w-4" />}
      </button>

      {/* Text / Edit */}
      {editing ? (
        <form onSubmit={commitEdit} className="flex flex-1 items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => commitEdit()}
            className="flex-1 rounded-lg border border-indigo-300 bg-white px-3 py-1 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="rounded-lg p-1 text-green-600 hover:bg-green-100"
            aria-label="Save"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"
            aria-label="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <span
          className={`flex-1 text-sm leading-relaxed ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      {!editing && (
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={startEdit}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-indigo-100 hover:text-indigo-600"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </li>
  );
}