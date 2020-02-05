import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import todoReducer from './todoReducer';
import TodoComponent from './TodoComponent';

const store = createStore(todoReducer);

const TodoMain = () => {
  return(
    <Provider store={store}>
      <TodoComponent />
    </Provider>
  );
};

export default TodoMain;