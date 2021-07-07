import React from 'react';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { connect } from 'react-redux';
import { removeTodo, markAsCompleted } from './actions';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPress }) => (
   <div className="list-wrapper">
      <NewTodoForm />
      {
         todos.map(todo => 
            <TodoListItem 
               todo={todo} 
               onRemovePressed={onRemovePressed} 
               onCompletedPress={onCompletedPress}/>
      )}
   </div>
);
const mapStateToProps = state => ({
   todos: state.todos
})

const mapDispatchToProps = dispatch => ({
   onRemovePressed: text => dispatch(removeTodo(text)),
   onCompletedPress: text => dispatch(markAsCompleted(text))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);