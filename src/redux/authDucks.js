import axios from "axios"

//CONSTANTS
const userData = {
    userInfo:[],
    loading:false,
    error:undefined,
    user:{},
    success:false,
}

//TYPES
 const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
 const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
 const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
 const USER_LOGOUT = 'USER_LOGOUT'

 const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
 const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
 const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'

 const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST'
 const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS'
 const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL'
 const USER_DETAILS_RESET = 'USER_DETAILS_RESET'

 const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST'
 const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS'
 const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL'
 const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET'

 const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
 const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
 const USER_LIST_FAIL = 'USER_LIST_FAIL'
 const USER_LIST_RESET = 'USER_LIST_RESET'

 const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
 const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
 const USER_DELETE_FAIL = 'USER_DELETE_FAIL'

 const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
 const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
 const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL'
 const USER_UPDATE_RESET = 'USER_UPDATE_RESET'

 //REDUCERS
 export default function userReducer = (state = userData,action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading:true,
            }
            
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                userInfo:action.payload
            }   
        case USER_REGISTER_FAIL:
            return {
                ...state,
                error:action.payload
            }     
        case USER_LOGOUT:
            return {}    
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading:true,
            }    
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo:action.payload,
            }    
        case USER_LOGIN_FAIL:
            return {
                ...state,
                error:action.payload,
            }    
        case USER_LOGOUT:
            return {}    
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
            }    
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                user:action.payload,
            }    
        case USER_DETAILS_FAIL:
            return {
                ...state,
                error:action.payload
            }    
        case USER_DETAILS_RESET:
            return {}    
        default:
            return state;
    }
 }

//ACTIONS