import React from "react";

function HtmlInput(props) {
  const { data } = props;
  const { type, value } = data;
  return (
    <div>
      <input type={type} value={value} onChange={() => {}} />
    </div>
  );
}

export default HtmlInput;
