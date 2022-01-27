import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

// Component to contain all interviewers
export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  
  // generate array of Interviewer components to render
  const interviewerArray = interviewers.map(interviewer => <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === value}
    setInterviewer={() => onChange(interviewer.id)}
    />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerArray}
      </ul>
    </section>
  );
}

// prop type check
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}