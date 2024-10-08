export const SET_API_URL = 'SET_API_URL';

export const setApiUrl = (url) => {
  return {
    type: SET_API_URL,
    payload: url,
  };
};