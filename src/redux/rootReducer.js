import { combineReducers } from 'redux';
import { backendApiReducer } from './BaseUrl/base_url_reducer'
import { activationReducer } from './Activation/activation_reducer';
import { refreshAccessTokenReducer } from './RefreshToken/refresh_reducer';

const rootReducer = combineReducers({

    api_url: backendApiReducer,
    activate: activationReducer,
    refresh_access_token: refreshAccessTokenReducer,
});

export default rootReducer;