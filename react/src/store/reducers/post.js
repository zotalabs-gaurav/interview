import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    data: [],
}

const savePostData = (state = initialState, action) => {
    return updateObject(state, {
        data: action.data,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_POST_DATA: return savePostData(state, action);
        default: return state;
    }
}
export default reducer;
