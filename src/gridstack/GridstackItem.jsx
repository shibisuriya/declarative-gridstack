import React, { useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";

export default function GridstackItem(props) {
  useEffect(() => {
    return () => {};
  }, []);

  // Copy the props which should not be mutated by the user, when the user changes a prop after the gs-item has
  // been initialized it should not effect the gs-item. Ones the gs-item has been initialized the user shouldn't
  // change the following, x, y, w, h and id.
  const { x, y, w, h, id } = props;
  const attr = cloneDeep({ x, y, w, h, id });
  return (
    <div
      className="grid-stack-item"
      gs-x={attr.x}
      gs-y={attr.y}
      gs-w={attr.w}
      gs-h={attr.h}
      gs-id={attr.id}
      gs-no-resize={attr.noResize}
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
