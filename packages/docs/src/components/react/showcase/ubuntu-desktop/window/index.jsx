import React, { Fragment } from "react";
import TitleBar from "./TitleBar.jsx";
import styles from "./window.module.css";

export default function Window(props) {
  const { children, onClose } = props;
  return (
    <Fragment>
      <TitleBar
        onClose={() => {
          onClose();
        }}
      />
      <div className={styles.body}>{children}</div>
    </Fragment>
  );
}
