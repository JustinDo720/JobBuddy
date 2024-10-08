import { combineReducers } from 'redux';
import { backendApiReducer } from './BaseUrl/base_url_reducer'


const rootReducer = combineReducers({

    api_url: backendApiReducer,

});

export default rootReducer;