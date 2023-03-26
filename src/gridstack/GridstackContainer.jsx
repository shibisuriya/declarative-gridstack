import React, { useEffect } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
export default function GridstackLayout(props) {
  useEffect(() => {
    // perform initialization or setup here
    console.log("Component mounted!");

    const grid = GridStack.init();

    // return a cleanup function if necessary
    return () => {
      // perform cleanup here if necessary
      console.log("Component unmounted!");
    };
  }, []); // empty dependency array to ensure it only runs once

  return <div className="grid-stack">{props.children}</div>;
}
