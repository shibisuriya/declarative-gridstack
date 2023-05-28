import React from "react";
function CalendarWidget(props) {
  const { data } = props;
  return (
    <div>
      <h4>{data.title}</h4>
      <div>Date is: {data.data}</div>
    </div>
  );
}
export default CalendarWidget;
