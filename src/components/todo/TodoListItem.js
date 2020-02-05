import React from 'react';

const TodoListItem = props => {
  const { todo } = props;

  return (
    <div>
      <p>{todo.text}</p>
    </div>
  )
};

export default TodoListItem;