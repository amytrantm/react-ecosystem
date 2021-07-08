import { 
    CREATE_TODO, REMOVE_TODO, MARK_AS_COMPLETED,
    LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE
    } from './actions';


    //use selectors instead
// export const isLoading = (state = false, action) => {
//     const { type } = action;
//     switch (type) {
//         case LOAD_TODOS_IN_PROGRESS: 
//             return true;
//         case LOAD_TODOS_SUCCESS:
//         case LOAD_TODOS_FAILURE:
//             return false;
//         default:
//             return state;
//     }
// }

/*
 state.todos: {
     isLoading: false,
     data:[...]
 }

*/

const initialState = { isLoading: false, data: [] };

export const todos = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {    //action.type
    case CREATE_TODO: {
        const { todo } = payload;
        return {
                ...state,
                data: state.data.concat(todo),
            };
    }
    case REMOVE_TODO: {
        const { todo: todoToRemove } = payload;  //set nickname: todoToRemove
        return {
                ...state,
                data: state.data.filter(todo => todo.id !== todoToRemove.id),
            };
    }
    case MARK_AS_COMPLETED: {
        const { todo: updatedTodo } = payload;
        return {
                ...state,
                data: state.data.map(todo => {
                    if (todo.id === updatedTodo.id) {
                        return updatedTodo;
                    }
                    return todo;
                }),
            };
    }
    //load from API
    case LOAD_TODOS_SUCCESS: {
        const { todos } = payload;  //from actions.js
        return {
                ...state,
                isLoading: false,
                data: todos,
            };;
    }
    case LOAD_TODOS_IN_PROGRESS:
        return {
                ...state,
                isLoading: true,
            }
    case LOAD_TODOS_FAILURE:
        return {
                ...state,
                isLoading: false,
            }
    default:
        return state;
    }
}


