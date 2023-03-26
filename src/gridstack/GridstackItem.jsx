import React, { useEffect } from "react";

export default function GridstackItem(props) {
  useEffect(() => {
    // perform initialization or setup here
    console.log("Component mounted!");

    // return a cleanup function if necessary
    return () => {
      // perform cleanup here if necessary
      console.log("Component unmounted!");
    };
  }, []); // empty dependency array to ensure it only runs once

  return (
    <div
      className="grid-stack-item"
      gs-x={props.x}
      gs-y={props.y}
      gs-w={props.w}
      gs-h={props.h}
      gs-id={props.id}
      gs-no-resize={props.noResize}
    >
      <div
        className="grid-stack-item-content"
        style={{ overflowY: props.noScroll ? "hidden" : "auto" }}
      >
        {props.children}
      </div>
    </div>
  );
}
