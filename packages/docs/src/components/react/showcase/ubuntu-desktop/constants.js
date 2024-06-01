import React from "react";

import FileManger from "./apps/FileManger.jsx";
import Firefox from "./apps/Firefox.jsx";
import Terminal from "./apps/Terminal.jsx";
import Launcher from "./apps/Launcher.jsx";
import Vlc from "./apps/Vlc.jsx";

const APPS = {
  LAUNCHER: { id: "LAUNCHER", component: Launcher },
  FILE_MANGER: { id: "FILE_MANGER", component: FileManger },
  FIREFOX: { id: "FIREFOX", component: Firefox },
  TERMINAL: { id: "TERMINAL", component: Terminal },
  VLC: { id: "VLC", component: Vlc },
};

export { APPS };
