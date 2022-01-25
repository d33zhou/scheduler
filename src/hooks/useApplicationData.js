import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [ state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then(all => {      
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
    
  }, []);

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const dayId = state.days.find(day => day.name === state.day).id - 1; // -1 to match state.days 0 indexing from server API
    // const spotsRemaining = getAppointmentsForDay(state, state.day)
    //   .filter(appointment => appointment.interview === null)
    //   .length - 1; // 0 - 5 spots

    // const day  = {
    //   ...state.days[dayId],
    //   spots: spotsRemaining
    // }

    // const days = state.days.map(stateDay => {
    //   const stateDayId = stateDay.id - 1; // to match 0 indexing of state.days
    //   return stateDayId !== dayId ? {...state.days[stateDayId]} : day;
    // });
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState(prev => ({...prev, appointments})))
      .then(() => axios.get('/api/days'))
      .then(res => setState(prev => ({...prev, days: res.data})));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // const dayId = state.days.find(day => day.name === state.day).id - 1; // -1 to match state.days 0 indexing from server API
    // const spotsRemaining = getAppointmentsForDay(state, state.day)
    //   .filter(appointment => appointment.interview === null)
    //   .length + 1;

    // const day = {
    //   ...state.days[dayId],
    //   spots: spotsRemaining
    // }

    // const days = state.days.map(stateDay => {
    //   const stateDayId = stateDay.id - 1; // to match 0 indexing of state.days
    //   return stateDayId !== dayId ? {...state.days[stateDayId]} : day;
    // });
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(({...state, appointments})))
      .then(() => axios.get('/api/days'))
      .then(res => setState(prev => ({...prev, days: res.data})));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}