import * as actionTypes from "./actionTypes";

const saveData = (data) => {
  return {
    type: actionTypes.SAVE_POST_DATA,
    data,
  };
};

const savePostData = (data) => {
  return (dispatch) => {
    dispatch(saveData(data));

  };
};

export { savePostData };
