import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    UPDATE_CONTACT,
    SET_ALERT,
    CLEAR_CONTACT,
    SET_CURRENT,
    CONTACT_ERROR,
    GET_CONTACTS,
} from './Types'
export default (state,action) => {
  switch (action.type) {
    case ADD_CONTACT:
        return {
            ...state,
            contacts : [action.payload,...state.contacts],
            loading:false
        }
    case DELETE_CONTACT:
    return {
        ...state,
        contacts : state.contacts.filter(contact=>  contact._id!==action.payload),
        loading:false
    }

    case CLEAR_CONTACT:
    return {
        ...state,
        contacts : null,
        current:null,
        filter:null
    }

    case UPDATE_CONTACT:
    return {
        ...state,
        contacts : state.contacts.map(contact => contact._id===action.payload._id ? action.payload : contact),
        loading:false
    }

    case SET_CURRENT:
    return {
        ...state,
        current : action.payload  
    }

    case CLEAR_CURRENT:
    return {
        ...state,
        current : null
    }

    case FILTER_CONTACTS:
    return {
        ...state,
        filtered : state.contacts.filter(contact=> {
            const regex = new RegExp(`${action.payload}`,'gi');
            return contact.name.match(regex || contact.email.match(regex))
        })
    }

    case CLEAR_FILTER:
    return {
        ...state,
        filtered : null
    }

    case CONTACT_ERROR : 
    return {
        ...state,
        error:action.payload
    }

    case GET_CONTACTS : 
    return {
        ...state,
        contacts:action.payload,
        loading:false
    }
      default:
        return state
  }
}
