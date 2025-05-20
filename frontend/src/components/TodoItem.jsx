import React from 'react';

const TodoItem = ({ todo, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header">
        <h3>{todo.text}</h3>
        <div className="todo-actions">
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => onToggleComplete(todo.id)} 
          />
          <button onClick={() => onEdit(todo)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(todo.id)} className="delete-btn">Delete</button>
        </div>
      </div>
      {todo.description && <p className="todo-description">{todo.description}</p>}
    </div>
  );
};

export default TodoItem;
