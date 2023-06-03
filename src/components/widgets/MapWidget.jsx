import React from "react";
import styles from "./styles.module.css";
function MapWidget(props = {}) {
  const { data } = props;
  return (
    <div className={styles.widget}>
      <div>
        <h4 className={styles.title}>{data.title}</h4>
        <div className={styles["text-data"]}>{data.data}</div>
      </div>
    </div>
  );
}
export default MapWidget;
