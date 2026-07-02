import React from 'react';

function TodoStats({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionPercentage =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-value">{totalTodos}</div>
        <div className="stat-label">মোট কাজ</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{activeTodos}</div>
        <div className="stat-label">সক্রিয় কাজ</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{completedTodos}</div>
        <div className="stat-label">সম্পন্ন কাজ</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{completionPercentage}%</div>
        <div className="stat-label">সমাপ্তি হার</div>
      </div>
    </div>
  );
}

export default TodoStats;