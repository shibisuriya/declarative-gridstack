import React, { Fragment, useState } from "react";

function HtmlInput(props) {
  const { data } = props;
  const { type } = data;
  const [value, setValue] = useState(data.value);
  return (
    <Fragment>
      <div className="title">{type}</div>
      <div className="html-input">
        <input
          type={type}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </Fragment>
  );
}

export default HtmlInput;
