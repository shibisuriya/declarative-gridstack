import React, { Fragment } from "react";
import styles from "./styles.module.css";
function MapWidget(props = {}) {
  const { data, remove } = props;
  return (
    <div className={styles.widget}>
      <button onClick={remove}>x</button>
      <div>
        <h4 className={styles.title}>{data.title}</h4>
        <div className={styles["text-data"]}>{data.data}</div>
      </div>
    </div>
  );
}
export default MapWidget;
