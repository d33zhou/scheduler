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

export default reducer;
export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
}