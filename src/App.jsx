import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import FilterButtons from './components/FilterButtons';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [darkMode, setDarkMode] = useState(false);

  // Local Storage থেকে ডেটা লোড করুন
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Local Storage এ ডেটা সেভ করুন
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // নতুন Todo যোগ করুন
  const addTodo = (text, priority) => {
    const newTodo = {
      id: Date.now(),
      text,
      priority,
      completed: false,
      createdAt: new Date().toLocaleString('bn-BD'),
    };
    setTodos([newTodo, ...todos]);
  };

  // Todo ডিলিট করুন
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Todo সম্পন্ন করুন
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todo এডিট করুন
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // ফিল্টার করা Todos
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        {/* হেডার */}
        <header className="header">
          <div className="header-top">
            <h1>✅ আমার কাজের তালিকা</h1>
            <button
              className="dark-mode-btn"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <p className="subtitle">আপনার প্রতিদিনের কাজ সংগঠিত করুন এবং উৎপাদনশীল থাকুন</p>
        </header>

        {/* ইনপুট ফর্ম */}
        <TodoInput onAddTodo={addTodo} />

        {/* স্ট্যাটিস্টিক্স */}
        <TodoStats todos={todos} />

        {/* ফিল্টার বাটন */}
        <FilterButtons filter={filter} setFilter={setFilter} />

        {/* Todo লিস্ট */}
        <TodoList
          todos={filteredTodos}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
          onEditTodo={editTodo}
        />

        {/* খালি স্টেট */}
        {todos.length === 0 && (
          <div className="empty-state">
            <p className="empty-emoji">📝</p>
            <p className="empty-text">কোন কাজ নেই। একটি নতুন কাজ যোগ করুন!</p>
          </div>
        )}

        {filteredTodos.length === 0 && todos.length > 0 && (
          <div className="empty-state">
            <p className="empty-emoji">🎉</p>
            <p className="empty-text">
              {filter === 'completed'
                ? 'এখনো কোন সম্পন্ন কাজ নেই'
                : 'সব কাজ সম্পন্ন হয়েছে! দুর্দান্ত!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;