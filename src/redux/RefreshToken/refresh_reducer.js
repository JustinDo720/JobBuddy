import { REFRESH_TOKEN } from "./refresh_action";

const initialStore = {
    access_token: localStorage.getItem('access_token') || null,
}

export const refreshAccessTokenReducer = (state=initialStore, action) => {
    switch(action.type){
        case REFRESH_TOKEN:
            return {
                ...state,
                access_token: action.payload.access_token
            }
        default:
            return state
    }
}