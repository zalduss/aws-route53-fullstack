import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// API base URL
const API_URL = 'http://localhost:8000/api/todos/';

function App() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all todos from the API
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setTodos(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching todos:', err);
            setError('Failed to load todos. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Add a new todo or update an existing one
    const handleSubmitTodo = async (todoData) => {
        try {
            if (todoData.id) {
                // Update existing todo
                const response = await axios.put(`${API_URL}${todoData.id}/`, todoData);
                setTodos(todos.map(todo => 
                    todo.id === todoData.id ? response.data : todo
                ));
            } else {
                // Add new todo
                const response = await axios.post(API_URL, {
                    ...todoData,
                    createdAt: new Date().toISOString()
                });
                setTodos([...todos, response.data]);
            }
            setError(null);
        } catch (err) {
            console.error('Error saving todo:', err);
            setError('Failed to save todo. Please try again.');
        }
    };

    // Delete a todo
    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}/`);
            setTodos(todos.filter(todo => todo.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting todo:', err);
            setError('Failed to delete todo. Please try again.');
        }
    };

    // Set a todo for editing
    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
        // Scroll to the form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Toggle todo completion status
    const handleToggleComplete = async (id) => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            if (!todoToUpdate) return;
            
            const updatedTodo = { 
                ...todoToUpdate, 
                completed: !todoToUpdate.completed 
            };
            
            const response = await axios.put(`${API_URL}${id}/`, updatedTodo);
            setTodos(todos.map(todo => 
                todo.id === id ? response.data : todo
            ));
            setError(null);
        } catch (err) {
            console.error('Error updating todo status:', err);
            setError('Failed to update todo status. Please try again.');
        }
    };

    return (
        <div className="todo-app">
            <header>
                <h1>Todo App</h1>
            </header>
            
            <main>
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={fetchTodos} className="retry-btn">Try Again</button>
                    </div>
                )}
                
                <TodoForm 
                    onSubmit={handleSubmitTodo} 
                    editingTodo={editingTodo}
                    setEditingTodo={setEditingTodo}
                />
                
                {loading ? (
                    <div className="loading-spinner">
                        <p>Loading todos...</p>
                    </div>
                ) : (
                    <TodoList 
                        todos={todos} 
                        onDelete={handleDeleteTodo}
                        onEdit={handleEditTodo}
                        onToggleComplete={handleToggleComplete}
                    />
                )}
            </main>
            
            <footer>
                <p>© {new Date().getFullYear()} Todo App | {todos.length} {todos.length === 1 ? 'task' : 'tasks'} | {todos.filter(t => t.completed).length} completed</p>
            </footer>
        </div>
    );
}

export default App;
