import React, { useEffect } from 'react';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { connect } from 'react-redux';
//import { markAsCompleted } from './actions';
import { displayAlert, loadTodos, removeTodoRequest, markAsCompletedRequest } from './thunks';
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
                  key={todo.id}
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
   onRemovePressed: id => dispatch(removeTodoRequest(id)), //thunk
   onCompletedPress: id => dispatch(markAsCompletedRequest(id)), //thunk
   startLoadingTodos: () => dispatch(loadTodos()) //thunk
   //onDisplayAlertClicked: text => dispatch(displayAlert(text))   //example how thunk works
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);