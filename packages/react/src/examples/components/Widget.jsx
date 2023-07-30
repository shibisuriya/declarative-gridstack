import React from "react";

const Widget = (props) => {
  const { data } = props;
  return (
    <div className="widget">
      <div>
        <h1>{data.title}</h1>
        <div>{data.data}</div>
      </div>
    </div>
  );
};

export { Widget };
