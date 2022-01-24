import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";

let statusMessage = "";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    statusMessage="Saving"
    transition(STATUS);
    bookInterview(id, interview).then(() => transition(SHOW));
  }

  function deleteAppointment(id) {
    statusMessage="Deleting"
    transition(STATUS);
    cancelInterview(id).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={() => deleteAppointment(id)}
        onCancel={() => back()}
        />}
      {mode === STATUS && <Status message={statusMessage} />}
      {mode === SHOW && <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete={() => transition(CONFIRM)}
      />}
      {mode === CREATE && <Form
        interviewers={interviewers}
        onCancel={() => back()}
        onSave={save}
        />}
    </article>
  );
}