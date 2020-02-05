import React, {useState} from 'react';
import { connect } from 'react-redux';

import { addTodoItem, asyncAddTodoItem } from './todoActions';
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

// mapDispatchToProps can be function, 
// in this case it will accept dispatch as a first argument
/*const mapDispatchToProps = dispatch => {
  return {
    addTodoItem: todoText => {
      dispatch(addTodoItem(todoText));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);*/

// mapDispatchToProps can also be an object
// in this case connect will automatically dispatch actions
export default connect(mapStateToProps, { addTodoItem })(TodoComponent);

// To perform async actions, you can pass dispatch to action creators
/*const mapDispatchToProps = dispatch => {
  return {
    addTodoItem: todoText => {
      asyncAddTodoItem(dispatch, todoText);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoComponent);*/

// reference: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559