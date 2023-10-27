import {combineReducers, legacy_createStore as createStore} from 'redux';
import {appReducer, AppReducerActionsType} from './app-reducer';

const rootReducer = combineReducers({
  app: appReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = AppReducerActionsType

// @ts-ignore
window.store = store;
