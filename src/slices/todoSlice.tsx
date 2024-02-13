import { createSlice } from '@reduxjs/toolkit'


type TodoItem = {
    id:any;
    text: string;
    completed: boolean;
  };

export interface TodoState {
 todos:TodoItem[];
 newTodo:string;
 editingTodo:null;
 editText:string;

}

const initialState: TodoState = {
    todos:[],
   newTodo:'' ,
   editingTodo:null,
   editText:'',
}

export const todoSlice = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {
   
    setTodos: (state, action  ) => {
      state.todos = action.payload
    },
    setNewTodo: (state, action  ) => {
      state.newTodo = action.payload
    },
    setEditingTodo: (state, action  ) => {
      state.editingTodo = action.payload
    },
    setEditText: (state, action  ) => {
      state.editText = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setTodos , setNewTodo , setEditingTodo , setEditText,   } = todoSlice.actions

export default todoSlice.reducer