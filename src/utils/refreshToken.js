import axios from 'axios'

// We need this to be an async function because when we're returning a value the value is
// dependant on the response of our axios api call
export const refreshToken = async (access, refresh, baseURL) => {
    if (access && refresh) {
      try {
        const response = await axios.post(`${baseURL}/users/auth/jwt/verify/`, {
          token: access
        });
  
        return access;
      } catch (err) {
        // Suppressing the error message, no console log here
        try {
          // If the access token has expired, get a new one using the refresh token
          const response = await axios.post(`${baseURL}/users/auth/jwt/refresh/`, {
            refresh: refresh
          });
  
          // Return new access token
          return response.data.access;
        } catch (err) {
          // Suppressing the error message, no console log here either
          return ''; // Return empty string on failure
        }
      }
    } else {
      // Handle case where access or refresh tokens are missing, but no console log
      return '';
    }
  };
  