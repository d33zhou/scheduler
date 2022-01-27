import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

// Component for each day (day name, spots remaining)
export default function DayListItem(props) {
  // conditional class names
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}