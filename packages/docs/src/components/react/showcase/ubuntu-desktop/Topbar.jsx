import React from "react";
import styles from "./topbar.module.css";

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <div>Activites</div>
      <div className={styles.date}>10 Apr 13:30</div>
      <div className={styles.indicators}>
        <div>i</div>
        <div>i</div>
        <div>i</div>
        <div>i</div>
      </div>
    </div>
  );
};

export default Topbar;
