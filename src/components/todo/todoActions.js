import { ADD_TODO_ITEM } from './todoTypes';

let id = 1; // keep incrementing it

export const addTodoItem = todoText => {
  const action = {
    type: ADD_TODO_ITEM,
    payload: {
      text: todoText,
      id: id++,
      done: false
    }
  };
  return action;
};

export const asyncAddTodoItem = (dispatch, todoText) => {
  const action = {
    type: ADD_TODO_ITEM,
    payload: {
      text: todoText,
      id: id++,
      done: false
    }
  };
  setTimeout(() => {
    dispatch(action);
  }, 100);
};