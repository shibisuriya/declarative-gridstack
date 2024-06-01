import React from "react";
import styles from "./sidebar.module.css";

const icons = ["app1", "app2", "app3", "app4"];

import excel from "./images/app-icons/excel.png";
import fileManager from "./images/app-icons/file-manager.png";
import firefox from "./images/app-icons/firefox.png";
import launcher from "./images/app-icons/launcher.png";
import terminalEmulator from "./images/app-icons/terminal-emulator.png";
import vlc from "./images/app-icons/vlc.png";
import { APPS } from "./constants";

function Sidebar(props) {
  const { open } = props;
  return (
    <div className={styles.sidebar}>
      <img src={launcher} onClick={() => open(APPS.LAUNCHER.id)} />
      <img src={fileManager} onClick={() => open(APPS.FILE_MANGER.id)} />
      <img src={firefox} onClick={() => open(APPS.FIREFOX.id)} />
      <img src={terminalEmulator} onClick={() => open(APPS.TERMINAL.id)} />
      <img src={vlc} onClick={() => open(APPS.VLC.id)} />
    </div>
  );
}

export default Sidebar;
