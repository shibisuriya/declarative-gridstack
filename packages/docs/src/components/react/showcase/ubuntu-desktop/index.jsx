import React, { useRef } from "react";

import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Body from "./Body.jsx";

import styles from "./desktop.module.css";

const UbuntuDesktop = () => {
  const bodyRef = useRef();
  return (
    <div className={styles.desktop}>
      <Topbar />
      <Sidebar open={(app) => bodyRef.current.open(app)} />
      <Body ref={bodyRef} />
    </div>
  );
};

export default UbuntuDesktop;
