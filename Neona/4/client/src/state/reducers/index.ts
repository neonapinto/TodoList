import { combineReducers } from "redux";
import reducer from './TodoReducer';

const reducers = combineReducers({
    todo: reducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>;