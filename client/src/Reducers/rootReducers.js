import aReducers from './aReducers';
import tReducers from './tReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    aR: aReducers,
    tr: tReducers,
});


export default rootReducer;