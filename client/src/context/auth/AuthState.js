import React ,{useReducer} from 'react'
import AuthContext from './AuthContext'
import Reducer from './AuthReducer'
import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS

} from '../Types'
import setAuthToken from '../../utils/setAuthToken'



const State =  props => {
    const initialState = {
       token : localStorage.getItem('token'),
       isAuthenticated : null,
       loading :true,
       error : null,
       user:null
    }

    const [state,dispatch] = useReducer(Reducer,initialState)

   //Load user

   const loadUser = async ()=> {

        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

       try {
        const res = await axios.get('/api/auth')
        console.log(res)
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
       } catch (e) {
        dispatch({
            type :AUTH_ERROR
        })
       }
   }

   //Register user
   const register = async formData => {
       const config = {
           headers :{
                'Content-Type':'application/json'
           }
       }
       try {
        const res = await axios.post('/api/users',formData,config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload : res.data
        })

        loadUser()

       } catch (e) {
        dispatch({
            type:REGISTER_FAIL,
            payload:e.response.data.message
        })
       }

   }

   //Login user
   const login = async formData => {
    const config = {
        headers :{
             'Content-Type':'application/json'
        }
    }
    try {
     const res = await axios.post('/api/auth',formData,config);

     dispatch({
         type: LOGIN_SUCCESS,
         payload : res.data
     })

     loadUser()

    } catch (e) {
     dispatch({
         type:LOGIN_FAIL,
         payload:e.response.data.message
     })
    }

}


   //Logout
   const logout = ()=> dispatch({type : LOGOUT})

 
   //Clear errors
   const clearErrors = ()=> dispatch({
       type: CLEAR_ERRORS
   })


    return (
        <AuthContext.Provider value={{
            token : state.token,
            isAuthenticated : state.isAuthenticated,
            loading : state.loading,
            user : state.user,
            error:state.error,
            register :register,
            loadUser:loadUser,
            login: login,
            logout: logout,
            clearErrors :clearErrors
        
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default  State