import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from 'reducers/application';

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