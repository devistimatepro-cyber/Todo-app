import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#ffd43b';
      case 'low':
        return '#51cf66';
      default:
        return '#868e96';
    }
  };

  const getPriorityEmoji = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⭕';
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-text-section">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              className="edit-input"
              autoFocus
            />
          ) : (
            <>
              <p className="todo-text">{todo.text}</p>
              <p className="todo-date">📅 {todo.createdAt}</p>
            </>
          )}
        </div>
        <span
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(todo.priority) }}
          title={`অগ্রাধিকার: ${todo.priority}`}
        >
          {getPriorityEmoji(todo.priority)}
        </span>
      </div>
      <div className="todo-actions">
        {!isEditing && (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            title="এডিট করুন"
          >
            ✏️
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          title="ডিলিট করুন"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;