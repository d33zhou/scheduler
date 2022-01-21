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