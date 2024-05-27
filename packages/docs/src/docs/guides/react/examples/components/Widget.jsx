import React from "react";
import style from "./styles.module.css";

const Widget = (props) => {
  const { data } = props;
  return (
    <div className={style["widget"]}>
      <div>
        <h1>{data.title}</h1>
        <div>{data.data}</div>
      </div>
    </div>
  );
};

export { Widget };
