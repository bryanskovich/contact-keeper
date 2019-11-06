import React ,{useReducer} from 'react'
import ContactContext from './Contact'
import axios from 'axios'
import Reducer from './Reducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    UPDATE_CONTACT,
    SET_ALERT,
    SET_CURRENT,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACT
} from './Types'


const State =  props => {
    const initialState = {
        contacts : null,
        current : null,
        filtered : null,
        error : null
    }

    const [state,dispatch] = useReducer(Reducer,initialState)


    //Get contacts 
    const getContacts = async () => {


        try {
            const res = await axios.get('/api/contacts')
            dispatch({type:GET_CONTACTS,payload :res.data})
        } catch (e) {
            dispatch({type:CONTACT_ERROR,payload:e.response.message})
        }
        
    }

    //Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type' :'application/json'
            }
        }


        try {
            const res = await axios.post('/api/contacts',contact,config)
            dispatch({type:ADD_CONTACT,payload :res.data})
        } catch (e) {
            dispatch({type:CONTACT_ERROR,payload:e.response.message})
        }
        
    }
    //Delete contact
    const deleteContact =async _id => { 
        try {
            const res = await axios.delete(`/api/contacts/${_id}`)
            dispatch({type:DELETE_CONTACT,payload :_id})
        } catch (e) {
            dispatch({type:CONTACT_ERROR,payload:e.response.message})
        }
       
    }
    //Set current contact
    const setCurrent = contact => {
        dispatch({type:SET_CURRENT,payload :contact})
    }
    //Clear current contact
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT})
    }

    //Clear contacts
    const clearContacts = () => {
        dispatch({type:CLEAR_CONTACT})
    }


    //Update contact 
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type' :'application/json'
            }
        }


        try {
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config)
            dispatch({type:UPDATE_CONTACT,payload : res.data})
        } catch (e) {
            dispatch({type:CONTACT_ERROR,payload:e.response.message})
        }
        
    }
    //Filter contacts

    const filterContacts = text => {
        dispatch({type:FILTER_CONTACTS,payload : text})
    }

    //Clear Filters
    const clearFilter = () => {
        dispatch({type:CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider value={{
            contacts : state.contacts,
            addContact:addContact,
            deleteContact:deleteContact,
            setCurrent :setCurrent,
            clearCurrent : clearCurrent,
            current : state.current,
            updateContact : updateContact,
            filtered : state.filtered,
            filterContacts: filterContacts,
            clearFilter : clearFilter,
            error: state.error,
            getContacts:getContacts,
            clearContacts: clearContacts
        
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default  State