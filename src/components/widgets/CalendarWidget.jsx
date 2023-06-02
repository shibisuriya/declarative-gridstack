import React from "react";
function CalendarWidget(props) {
  const { data } = props;
  const date = new Date(data.data).toLocaleString();
  return (
    <div>
      <h4>{data.title}</h4>
      <div>Date is: {date}</div>
    </div>
  );
}
export default CalendarWidget;
