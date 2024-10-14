import { ACTIVATION } from "./activation_action";

const initialStore = {
    acc_activated: localStorage.getItem('acc_activated') === 'true', // Check if the stored value is 'true'
    access_token: localStorage.getItem('access_token') || null, // Store the string directly
    refresh_token: localStorage.getItem('refresh_token') || null, // Store the string directly
    username: localStorage.getItem('username') || null, // Store the string directly
    user_id: localStorage.getItem('user_id') || null
};

export const activationReducer = (state=initialStore, action) => {
    switch(action.type){
        case ACTIVATION:
            return {
                ...state,
                acc_activated: action.payload.acc_activated,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,    
                username: action.payload.username,
                user_id: action.payload.user_id
            }
        default:
            return state
    }
}