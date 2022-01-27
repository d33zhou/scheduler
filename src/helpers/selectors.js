// return array of appointments for the given day
export function getAppointmentsForDay(state, day) {
  let appointments = [];

  // get the day object for the given day
  for (const dayElement of state.days) {
    if (dayElement.name === day) {
      
      // use appointment ID to push new array of appointments from appointments object
      dayElement.appointments.forEach(appointment => {
        appointments.push(state.appointments[appointment]);
      })

      return appointments;
    }
  }

  return appointments;
}

// return interview object that includes full interviewer details, if it exists
export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }

  return null;
}

// return array of interviewers for the given day
export function getInterviewersForDay(state, day) {
  let interviewers = [];

  // get the day object for the given day
  for (const dayElement of state.days) {
    if (dayElement.name === day) {
      
      // use interviewer ID to push new array of interviewers from interviewers object
      dayElement.interviewers.forEach(interview => {
        interviewers.push(state.interviewers[interview]);
      })

      return interviewers;
    }
  }

  return interviewers;
}