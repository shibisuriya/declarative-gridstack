import React from "react";
function MapWidget(props = {}) {
  const { data } = props;
  return (
    <div>
      <h4>{data.title}</h4>
      <div>{data.data}</div>
    </div>
  );
}
export default MapWidget;
