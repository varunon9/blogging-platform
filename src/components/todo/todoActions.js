import { ADD_TODO_ITEM } from './todoTypes';

let id = 1; // keep incrementing it

export const addTodoItem = (dispatch, todoText) => {
  const action = {
    type: ADD_TODO_ITEM,
    payload: {
      text: todoText,
      id: id++,
      done: false
    }
  };
  dispatch(action);
};