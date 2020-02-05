import { ADD_TODO_ITEM } from './todoTypes';

const initialState = {
  todoList: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_ITEM: {
      const todoList = state.todoList.concat(); // return new array
      todoList.push(action.payload);
      return {...initialState, todoList };
    }
  }

  return state;
};

export default todoReducer;