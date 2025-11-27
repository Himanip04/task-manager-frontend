import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.list.findIndex(t => t._id === action.payload._id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter(t => t._id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
