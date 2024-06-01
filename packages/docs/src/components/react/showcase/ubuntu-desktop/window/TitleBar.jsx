import React from "react";
import styles from "./titlebar.module.css";
import close from "../images/window-icons/close-icon.png";
import minimize from "../images/window-icons/minimize-icon.png";
import maximize from "../images/window-icons/maximize-icon.png";

const TitleBar = (props) => {
  const { onClose, onMaximize, onMinimize } = props;
  return (
    <div className={styles.titleBar}>
      <div className={styles.title}>VLC media player</div>
      <div className={styles.controls}>
        <img src={minimize} className={styles.control} />
        <img src={maximize} className={styles.control} />
        <img
          src={close}
          className={styles.control}
          onClick={() => {
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default TitleBar;
