import React from 'react';
//import './styles/TodoListItem.css';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

//take all the styles from TodoItemContainer and add additional style on top
const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
      ? 'none'
      : '2px solid red')};
`;



const ButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
`;

const CompletedButton = styled(Button)`
    background-color: #22ee22;
`;

const RemoveButton = styled(Button)`
    background-color: #ee2222;
    margin-left: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPress}) =>{
   const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning
   return (
                                 //line 16
      <Container createdAtProps={todo.createdAt}> 
         <h3>{todo.text}</h3>
         <p>
            Created at:&nbsp;
            {(new Date(todo.createdAt)).toLocaleDateString()}
         </p>
         <ButtonsContainer>
            {
               todo.isCompleted ? null :
                  <CompletedButton
                     onClick={() => onCompletedPress(todo.id)}
                  >Mark As Completed</CompletedButton>
            }

            <RemoveButton
               onClick={() => onRemovePressed(todo.id)}
            >Remove</RemoveButton>
         </ButtonsContainer>
      </Container>
   );
}
 

export default TodoListItem;