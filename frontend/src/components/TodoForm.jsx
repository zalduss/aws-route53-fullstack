import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editingTodo, setEditingTodo }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  // When editingTodo changes, populate form fields
  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setDescription(editingTodo.description || '');
      setCompleted(editingTodo.completed || false);
    } else {
      // Reset completed status when not editing
      setCompleted(false);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    const todoData = {
      text: text.trim(),
      description: description.trim(),
      completed: completed
    };
    
    if (editingTodo) {
      todoData.id = editingTodo.id;
    }
    
    onSubmit(todoData);
    resetForm();
  };

  const resetForm = () => {
    setText('');
    setDescription('');
    setCompleted(false);
    if (setEditingTodo) setEditingTodo(null);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
      
      <div className="form-group">
        <label htmlFor="todoText">Todo</label>
        <input
          id="todoText"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="todoDescription">Description (optional)</label>
        <textarea
          id="todoDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this todo"
          rows="3"
        />
      </div>
      
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          Mark as completed {!editingTodo && "(for tasks you've already done)"}
        </label>
      </div>
      
      <div className="form-actions">
        {editingTodo && (
          <button 
            type="button" 
            onClick={resetForm} 
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="submit-btn">
          {editingTodo ? 'Update' : 'Add'} Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
