import { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// reducer to set state
function reducer(state, action) {
  switch (action.type) {
    // changing day state
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    
    // for initializing data on first load
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };

    // update state for appointments (add/edit/delete interview) and days (spots)
    case SET_INTERVIEW: {

      // APPOINTMENTS -----

      // clone new appointment object for new appointment to replace empty appointment
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview ? {...action.interview} : null
      };

      // clone new appointments object and replace appointment value for current appointment
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      // DAYS -------------

      // get current day object
      const currentDay = state.days.find(day => day.name === state.day);

      // with appointments array for current day, sum null interviews in updated appointments
      const spotsRemaining = currentDay.appointments.filter(
        appointmentId => appointments[appointmentId].interview === null
        ).length;

      // create new day object for current day with updated spots
      const day = {
        ...currentDay,
        spots: spotsRemaining
      };

      // create new days array with all existing day objects and replace current day object with new
      const days = state.days.map(
        stateDay => stateDay.id !== currentDay.id ? {...stateDay} : day
      );
      
      return {
        ...state,
        appointments,
        days
      };
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

// for all data management and initial set-up
export default function useApplicationData() {
  
  // set base state
  const [ state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // day setter function to export for state management
  const setDay = day => dispatch({ type: SET_DAY, day });
  
  // axios GET requests to server API to set state with API data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(all => {      
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });


    // WebSocket -----

    // create new WebSocket
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    // send message to server on connection
    ws.onopen = event => {
      ws.send("ping");
    };

    // event listener, on receiving messages from server set new state with data
    ws.onmessage = event => {
      
      // parse JSON string
      const { type, id, interview } = JSON.parse(event.data);

      if (type === SET_INTERVIEW) {
        dispatch({
          type: SET_INTERVIEW,
          id: id,
          interview: interview,
        });
      }
    }
  }, []);

  // axios PUT request to update server API and state for persistent data
  function bookInterview(id, interview) {

    // PUT request to server and set new state
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }));
  }

  // axios DELETE request to remove interview data for appointment slot
  function cancelInterview(id) {
    
    // DELETE request to server and set new state
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}