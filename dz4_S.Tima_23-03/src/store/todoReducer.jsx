import axios from "axios"

const initialState = {todos: []}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload]}
        case 'REMOVE_TODO':
            return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload)}
        case 'SET_TODOS':
            return { ...state, todos: action.payload }
        default:
            return state
    }
}

export const fetchTodos = () => {
    return  async (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
            .then(resp => dispatch({type: 'SET_TODOS', payload: resp.data}))
    }
}

export const addTodo = payload => ({type: "ADD_TODO", payload})
export const deleteTodo = payload => ({type: "REMOVE_TODO", payload})
export default todoReducer
