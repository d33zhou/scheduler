import React from 'react';
import DayListItem from './DayListItem';

// Component to contain each day
function DayList(props) {
  const { days, value, onChange } = props;

  // generate array of Day components to render
  const daysArray = days.map(day => <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === value}
    setDay={onChange}
    />);
  
  return (
    <ul>
      {daysArray}
    </ul>
  );
}

export default DayList;