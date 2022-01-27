import { useState, useEffect } from 'react';
import axios from 'axios';

// for all data management and initial set-up
export default function useApplicationData() {
  // set base state
  const [ state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // day setter function to export for state management
  const setDay = day => setState({ ...state, day });
  
  // axios GET requests to server API to set state with API data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(all => {      
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // axios PUT request to update server API and state for persistent data
  function bookInterview(id, interview) {
    
    // clone new appointment object for new appointment to replace empty appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // clone new appointments object and replace appointment value for current appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // generate new days array based on updated appointments
    const days = updateSpots(state, appointments);
    
    // PUT request to server and set new state
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState(prev => ({...prev, appointments, days})))
  }

  // axios DELETE request to remove interview data for appointment slot
  function cancelInterview(id) {
    
    // clone new appointment object and null the existing interview object
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // clone new appointments object and replace appointment value for current appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // generate new days array based on updated appointments
    const days = updateSpots(state, appointments);
    
    // DELETE request to server and set new state
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(({...state, appointments, days})))
  }

  // return new days array of day objects with updated spots after appointment change
  function updateSpots(state, appointments) {
    
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

    return days;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}