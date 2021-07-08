import React, { useEffect } from 'react';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { connect } from 'react-redux';
//import { markAsCompleted } from './actions';
import { loadTodos, removeTodoRequest, markAsCompletedRequest } from './thunks';
import { getTodosLoading, getCompletedTodos, getIncompletedTodos } from './selectors';
//import './styles/TodoList.css';
import styled from 'styled-components';

const BigRedText = styled.h3`
   font-size: 48px;
   color: #FF0000;
   text-align: center;
`
const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({incompletedTodos,completedTodos , onRemovePressed, onCompletedPress, isLoading, startLoadingTodos }) => {

   useEffect(()=> {
      startLoadingTodos()
   }, [])

   const loadingMessage = <div>Loading ... </div>
   const content = (
      <ListWrapper>
         <BigRedText>Todo List</BigRedText>
         <NewTodoForm />
         <h3> Incomplete: </h3>
         {
            incompletedTodos.map(todo =>
               <TodoListItem
                  key={todo.id}
                  todo={todo}
                  onRemovePressed={onRemovePressed}
                  onCompletedPress={onCompletedPress}
               // onCompletedPress={onDisplayAlertClicked}
               />
            )}
         <h3>Completed: </h3>
         {
            completedTodos.map(todo =>
               <TodoListItem
                  key={todo.id}
                  todo={todo}
                  onRemovePressed={onRemovePressed}
                  //onCompletedPress={onCompletedPress}
               // onCompletedPress={onDisplayAlertClicked}
               />
            )}
      </ListWrapper>
   );
   return isLoading ? loadingMessage : content
}

// const mapStateToProps = state => ({
//    todos: state.todos,
//    isLoading: state.isLoading
// })

// use selectors
const mapStateToProps = state => ({
   isLoading: getTodosLoading(state),
   completedTodos: getCompletedTodos(state),
   incompletedTodos: getIncompletedTodos(state)
})

const mapDispatchToProps = dispatch => ({
   onRemovePressed: id => dispatch(removeTodoRequest(id)), //thunk
   onCompletedPress: id => dispatch(markAsCompletedRequest(id)), //thunk
   startLoadingTodos: () => dispatch(loadTodos()) //thunk
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);