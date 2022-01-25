import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

const CONFIRM = "CONFIRM";
const CREATE = "CREATE";
const DELETE = "DELETE";
const EMPTY = "EMPTY";
const EDIT = "EDIT";
const SAVE = "SAVE";
const SHOW = "SHOW";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVE);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteAppointment(id) {
    transition(DELETE, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
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
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === SHOW && <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />}
      {mode === CREATE && <Form
        interviewers={interviewers}
        onCancel={() => back()}
        onSave={save}
        />}
      {mode === EDIT && <Form
        student={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={interviewers}
        onCancel={() => back()}
        onSave={save}
        />}
      {mode === ERROR_SAVE && <Error
        message="Could not save appointment"
        onClose={() => back()}
        />}
      {mode === ERROR_DELETE && <Error
        message="Could not cancel appointment"
        onClose={() => back()}
        />}
    </article>
  );
}