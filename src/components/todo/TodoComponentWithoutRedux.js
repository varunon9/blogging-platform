import React, {useState} from 'react';

import TodoListItem from './TodoListItem';

let id = 1; // keep incrementing it

const TodoComponent = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState('');

  const onTodoTextChange = event => {
    setTodoText(event.target.value);
  };

  const onAddButtonClick = e => {
    const oldTodoList = todoList.concat(); // return new array
    oldTodoList.push({
      text: todoText,
      id: id++,
      done: false
    });
    setTodoList(oldTodoList);
    setTodoText('');
  };

  return (
    <div>
      <div>
        <p>
          <input 
            type="text" 
            placeholder="Add your todo..." 
            onChange={onTodoTextChange} 
            value={todoText} 
          />
          <button onClick={onAddButtonClick}>Add</button>
        </p>
      </div>
      <div>
        <h3>My Todos</h3>
        {
          todoList.map((item, index) => {
            return (
              <TodoListItem key={item.id} todo={item} />
            )
          })
        }
      </div>
    </div>
  );
};

export default TodoComponent;