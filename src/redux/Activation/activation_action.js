// Export type
export const ACTIVATION = 'ACTIVATION'

// creating the actual action (updating the state)
export const setActivation = (data) => {


    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    
    // However, acc_activated & username will always be set because we need this to check if our user is auth
    localStorage.setItem('acc_activated', data.acc_activated);
    localStorage.setItem('username', data.username);
    localStorage.setItem('user_id', data.user_id)
    return {
        type: ACTIVATION,
        payload: {
            acc_activated: data.acc_activated,
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            username: data.username,
            user_id: data.user_id
        }
    }
}
