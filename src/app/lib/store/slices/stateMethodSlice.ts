import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '', // Начальное значение для свойства title
};

const stateMethodSlice = createSlice({
    name: 'stateMethod', // Имя фрагмента
    initialState, // Начальное состояние
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
    },
});

export const { setTitle } = stateMethodSlice.actions; // Экспорт созданных редукторов

export default stateMethodSlice.reducer; // Экспорт редуктора
