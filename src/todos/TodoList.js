import React, { useEffect } from 'react';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { connect } from 'react-redux';
import { removeTodo, markAsCompleted } from './actions';
import { displayAlert, loadTodos } from './thunks';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPress, onDisplayAlertClicked, isLoading, startLoadingTodos }) => {

   useEffect(()=> {
      startLoadingTodos()
   }, [])

   const loadingMessage = <div>Loading ... </div>
   const content = (
      <div className="list-wrapper">
         <NewTodoForm />
         {
            todos.map(todo =>
               <TodoListItem
                  todo={todo}
                  onRemovePressed={onRemovePressed}
                  onCompletedPress={onCompletedPress}
               // onCompletedPress={onDisplayAlertClicked}
               />
            )}
      </div>
   );
   return isLoading ? loadingMessage : content
}

const mapStateToProps = state => ({
   todos: state.todos,
   isLoading: state.isLoading
})

const mapDispatchToProps = dispatch => ({
   onRemovePressed: text => dispatch(removeTodo(text)),
   onCompletedPress: text => dispatch(markAsCompleted(text)),
   startLoadingTodos: () => dispatch(loadTodos()) //thunk
   //onDisplayAlertClicked: text => dispatch(displayAlert(text))   //example how thunk works
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);