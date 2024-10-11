// Export type
export const ACTIVATION = 'ACTIVATION'

// creating the actual action (updating the state)
export const setActivation = (data) => {

    // Store data in localStorage
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('acc_activated', data.acc_activated);
    
    return {
        type: ACTIVATION,
        payload: {
            acc_activated: data.acc_activated,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            username: data.username
        }
    }
}
