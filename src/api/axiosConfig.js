import axios from 'axios';
import { refreshToken } from '../utils/refreshToken'; // Make sure to import your refresh token logic
import { setNewAccessToken } from '../redux/RefreshToken/refresh_action'
import { setLogout } from '../redux/Logout/logout_action';
import store from '../redux/store'; // Import your Redux store

const baseURL = 'http://job-buddy-api.us-east-1.elasticbeanstalk.com/'
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL,
});
  

// Function to check and refresh the access token
const checkAndRefreshToken = async () => {
    const state = store.getState();
    const { access_token, refresh_token } = state.activate; // Adjust this according to your reducer structure
    
    if (refresh_token) {
      const new_token = await refreshToken(access_token, refresh_token, baseURL);
      if (new_token && new_token !== access_token) {
        store.dispatch(setNewAccessToken({access_token:new_token})); // Update Redux store with new token
        return new_token; // Return the new token to set in the config
      } else if (!new_token) {
        // Handle refresh token expiration (e.g., logout)
        store.dispatch(setLogout({}))
        window.location.href = '/'  // We cannot use navigate because this isn't a react component
      }
    }
    // This is because refreshToken util func returned our original access token
    return access_token; // Return the new token to set in the config
};

// Add a request interceptor to the Axios instance
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await checkAndRefreshToken(); // Call the function to check and refresh the token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Set the authorization header
        }
        return config; // Proceed with the request
    },
    (error) => {
        // Upon an auth error (401) We'll just log out the user 
        store.dispatch(setLogout({}));
        window.location.href = '/'  // We cannot use navigate because this isn't a react component
        return Promise.reject(error); // Handle request error
    }
);


export default axiosInstance; // Export the configured Axios instance