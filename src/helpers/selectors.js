export function getAppointmentsForDay(state, day) {
  let appointments = [];

  for (const dayElement of state.days) {
    if (dayElement.name === day) {
      
      dayElement.appointments.forEach(app => {
        appointments.push(state.appointments[app]);
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