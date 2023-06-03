import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://your-api-endpoint/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке "todo":', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`https://your-api-endpoint/todos/${id}`);
            deleteTodo(id);
        } catch (error) {
            console.error('Ошибка при удалении "todo":', error);
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleCreateTodo = async () => {
        try {
            const response = await axios.post('https://your-api-endpoint/todos', {
                title: newTodoTitle
            });
            const createdTodo = response.data;
            addTodo(createdTodo);
            setNewTodoTitle('');
        } catch (error) {
            console.error('Ошибка при создании "todo":', error);
        }
    };

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    return (
        <div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
            />
            <button onClick={handleCreateTodo}>Создать</button>
        </div>
    );
};

export default TodoList;
