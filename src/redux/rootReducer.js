import { combineReducers } from 'redux';
import { backendApiReducer } from './BaseUrl/base_url_reducer'
import { activationReducer } from './Activation/activation_reducer';


const rootReducer = combineReducers({

    api_url: backendApiReducer,
    activate: activationReducer,
    
});

export default rootReducer;