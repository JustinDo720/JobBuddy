import axios from 'axios'

// We need this to be an async function because when we're returning a value the value is
// dependant on the response of our axios api call
export const refreshToken = async (access,refresh,baseURL)=>{

    if (access && refresh){
        try{
            const response = await axios.post(`${baseURL}/users/auth/jwt/verify/`, {
                'token':access
            })

            return access
        } catch (err){
            console.log(err.message)
            try{
                // If we have an error, that means the access token has already expired; therefore, we'll get a new one.
                const response = await axios.post(`${baseURL}/users/auth/jwt/refresh/`, {
                    refresh: refresh
                });

                // Return new token
                return response.data.access;
            } catch(err){
                console.log('here?')
                return '';
            }
        }        
    } else {
        console.log('Something wrong with the store')
        return ''
    } 
}