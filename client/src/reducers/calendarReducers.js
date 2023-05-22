import {
    GET_EVENTS_FAIL,
    GET_EVENTS_SUCCESS,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_FAIL,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL
} from '../constants/calendarConstants'


  
export  const calendarReducer = (state = {events:{}}, action) => {
    switch (action.type) {

      case GET_EVENTS_SUCCESS:
        return {
          ...state,
          events: action.payload,
        }
  default:
    return state
  
      case GET_EVENTS_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case ADD_EVENT_SUCCESS:
        return {
          ...state,
          events: [...state.events, action.payload],
        }
  
      case ADD_EVENT_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case UPDATE_EVENT_SUCCESS:
        return {
          ...state,
          events: state.events.map(event =>
            event.id.toString() === action.payload.id.toString()
              ? { event, ...action.payload }
              : event
          ),
        }
  
      case UPDATE_EVENT_FAIL:
        return {
          ...state,
          error: action.payload,
        }
  
      case DELETE_EVENT_SUCCESS:
        return {
          ...state,
          events: state.events.filter(
            event => event.id.toString() !== action.payload.id.toString()
          ),
        }
  
      case DELETE_EVENT_FAIL:
        return {
          ...state,
          error: action.payload,
        }
    }
}

