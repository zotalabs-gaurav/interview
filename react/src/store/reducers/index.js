import { combineReducers } from 'redux';

import post from './post';

const rootReducer = combineReducers({
    postData: post,
})

export default rootReducer;