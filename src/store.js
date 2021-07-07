import { createStore, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { todos } from './todos/reducers';

const reducers = {
   todos,
};

const persistConfig = {
   key: 'root',
   storage,
   stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => 
   createStore(
      persistedReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(), 
   );






//before adding redux-persist
// import { createStore, combineReducers } from 'redux';
// import { todos } from './todos/reducers';

// const reducers = {
//    todos
// };

// const rootReducer = combineReducers(reducers);

// export const configureStore = () => createStore(rootReducer);