import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete }) => {
  if (todos.length === 0) {
    return <div className="empty-list">No todos yet. Add one above!</div>;
  }
  
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
