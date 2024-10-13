// Export type
export const LOGOUT = 'LOGOUT'

// creating the actual action (updating the state)
export const setLogout = (data) => {

    // Delete data in localStorage
    localStorage.removeItem('access_token', data.access_token);
    localStorage.removeItem('refresh_token', data.refresh_token);
    localStorage.removeItem('username', data.username);
    localStorage.removeItem('acc_activated', data.acc_activated);
    
    return {
        type: LOGOUT,
        payload: {
            acc_activated: null,
            access_token: null,
            refresh_token: null,
            username: null
        }
    }
}
