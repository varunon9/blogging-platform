import React, {useState} from 'react';
import { connect } from 'react-redux';

import { addTodoItem } from './todoActions';
import TodoListItem from './TodoListItem';

const TodoComponent = props => {
  const { todoList, addTodoItem } = props;

  const [todoText, setTodoText] = useState('');

  const onTodoTextChange = event => {
    setTodoText(event.target.value);
  };

  const onAddButtonClick = e => {
    addTodoItem(todoText);
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

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addTodoItem: todoText => {
      addTodoItem(dispatch, todoText);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);