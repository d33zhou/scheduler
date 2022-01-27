import React from "react";
import "components/Application.scss";

// Components
import DayList from "./DayList";
import Appointment from "./Appointment";

// Hooks/Selectors
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  // set state from custom Hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  // get interviewers array for current day in state
  const interviewers = getInterviewersForDay(state, state.day);

  // get appointments array for current day in state
  const appointmentsArray = getAppointmentsForDay(state, state.day).map(appointment => {
    
    // get interview details for appointment slot, if it exists
    const interview = getInterview(state, appointment.interview);

    // generate Appointment component to add to array
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  // push last appointment to array for time header only
  appointmentsArray.push(<Appointment key="last" time="5pm" />);

  // App render
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
      </section>
    </main>
  );
}
