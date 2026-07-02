import React, { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTodo(input, priority);
      setInput('');
      setPriority('medium');
    }
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="নতুন কাজ যোগ করুন..."
          className="todo-input"
          autoFocus
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">🟢 কম অগ্রাধিকার</option>
          <option value="medium">🟡 মাঝারি অগ্রাধিকার</option>
          <option value="high">🔴 উচ্চ অগ্রাধিকার</option>
        </select>
        <button type="submit" className="add-btn">
          ➕ যোগ করুন
        </button>
      </div>
    </form>
  );
}

export default TodoInput;