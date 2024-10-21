// Exporting Type
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const setNewAccessToken = (data)=>{
    localStorage.setItem('access_token', data.access_token);
    
    return {
        type: REFRESH_TOKEN,
        payload: {
            access_token: data.access_token
        }
    }
}