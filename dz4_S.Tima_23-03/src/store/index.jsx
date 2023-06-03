import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import todoReducer from './todoReducer';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todos: todoReducer,
    },
});

export default store;
