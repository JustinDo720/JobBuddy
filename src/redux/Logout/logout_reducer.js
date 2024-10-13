import { LOGOUT } from "./logout_action";

const initialStore = {
    acc_activated: localStorage.getItem('acc_activated') === 'true', // Check if the stored value is 'true'
    access_token: localStorage.getItem('access_token') || null, // Store the string directly
    refresh_token: localStorage.getItem('refresh_token') || null, // Store the string directly
    username: localStorage.getItem('username') || null, // Store the string directly
};

export const logoutReducer = (state=initialStore, action) => {
    switch(action.type){
        case LOGOUT:
            // Since we're logging out we just set these to null 
            return {
                ...state,
                acc_activated: null,
                access_token: null,
                refresh_token: null,
                username: null
            }
    }
}