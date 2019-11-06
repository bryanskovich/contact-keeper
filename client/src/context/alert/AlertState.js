import React ,{useReducer} from 'react'
import AlertContext from './AlertContext'
import uuid from 'uuid'
import Reducer from './AlertReducer'
import {
   SET_ALERT,REMOVE_ALERT

} from '../Types'



const State =  props => {
    const initialState = []

    const [state,dispatch] = useReducer(Reducer,initialState)

   //Set alert
   const setAlert = (msg,type,timeout = 5000) =>  {
        const id = uuid.v4()
        dispatch({type :SET_ALERT,payload :{msg,type,id}})

        setTimeout(()=>dispatch({
            type :REMOVE_ALERT,
            payload : id
        }),timeout)
   }



    return (
        <AlertContext.Provider value={{
            alerts : state,
            setAlert : setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default  State