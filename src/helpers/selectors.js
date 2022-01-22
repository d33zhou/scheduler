export function getAppointmentsForDay(state, day) {
  let appointments = [];

  for (const dayElement of state.days) {
    if (dayElement.name === day) {
      
      dayElement.appointments.forEach(appointment => {
        appointments.push(state.appointments[appointment]);
      })

      return appointments;
    }
  }

  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }

  return null;
}

export function getInterviewersForDay(state, day) {
  let interviewers = [];

  for (const dayElement of state.days) {
    if (dayElement.name === day) {
      
      dayElement.interviewers.forEach(interview => {
        interviewers.push(state.interviewers[interview]);
      })

      return interviewers;
    }
  }

  return interviewers;
}