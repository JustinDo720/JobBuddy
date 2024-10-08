import { SET_API_URL } from "./base_url_action";

const initialStore = {
    backendApiUrl: 'http://localhost:8000'
}

export const backendApiReducer = (state=initialStore, action) => {
    switch(action.type) {
        case SET_API_URL: 
            return {
                // If our action is SET_API_URL, we'll return the current store
                ...state,
                // in addition to this new key:value pair --> base_url:url
                backendApiUrl: action.payload,
            }
        default:
            return state
    }
}