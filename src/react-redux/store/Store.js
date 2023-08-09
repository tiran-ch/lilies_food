import { createStore } from 'redux';
import rootReducer from "../combine-reducers/combineReducers";

export const store = createStore(rootReducer);