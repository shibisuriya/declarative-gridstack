import React from "react";
import styles from "./styles.module.css";
function CalendarWidget(props) {
  const { data } = props;
  const date = new Date(data.data).toLocaleString();
  return (
    <div className={styles.widget}>
      <div>
        <h4 className={styles.title}>{data.title}</h4>
        <div className={styles["text-data"]}>Date is: {date}</div>
      </div>
    </div>
  );
}
export default CalendarWidget;
