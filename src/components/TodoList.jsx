import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo, onToggleTodo, onEditTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onToggle={onToggleTodo}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;