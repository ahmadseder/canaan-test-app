import React from 'react';
import Todo from './Todo';

const TodoList = ({todos, addTodo, handleUpdateTodo}) => {

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onUpdate={handleUpdateTodo} />
      ))}
    </div>
  );
}

export default TodoList;
