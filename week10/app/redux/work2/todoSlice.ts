import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // เพิ่มงาน
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    //เช็คว่าเสร็จหรือไม่เสร็จ
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(
        (t) => t.id === action.payload
      );
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    // ลบงาน
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(
        (t) => t.id !== action.payload
      );
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;