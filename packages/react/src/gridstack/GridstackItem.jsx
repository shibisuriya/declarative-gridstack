import React, { useContext, useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { MasterGridContext, SubgridContext } from "./contexts";

function GridstackItem(props) {
  const [areChildrenMounted, setAreChildrenMounted] = useState(false);

  const gsItemElement = useRef();
  const masterGrid = useContext(MasterGridContext);
  const subgrid = useContext(SubgridContext);

  const getGrid = () => {
    if (subgrid) {
      return subgrid;
    } else if (masterGrid) {
      return masterGrid;
    } else {
      throw new Error("Grid container (main or subgrid) not found!");
    }
  };
  useEffect(() => {
    if (!areChildrenMounted) {
      getGrid().makeWidget(gsItemElement.current);
      setAreChildrenMounted(true);
    } else {
      throw new Error(
        `Fatal error: Must not initialize Gridstack item with id ${props.id} multiple times.`
      );
    }
    return () => {};
    // eslint-disable-next-line
  }, []);

  // To ensure that the user's changes to certain props do not affect the initialized gs-item, it is important to make a copy of these props. The props that should not be mutated by the user after the gs-item has been initialized are x, y, w, h, and id. Once the gs-item has been initialized, the user should refrain from modifying these specific props.
  const { x, y, w, h, id, children, noScroll, className } = props;
  // temp
  const test = useRef(cloneDeep({ x, y, w, h, id, noScroll }));
  const attr = test.current;
  return (
    <div
      ref={gsItemElement}
      className={`grid-stack-item ${className}`}
      gs-x={attr.x}
      gs-y={attr.y}
      gs-w={attr.w}
      gs-h={attr.h}
      gs-id={attr.id}
      gs-no-resize={attr.noResize}
    >
      <div
        className="grid-stack-item-content"
        style={{ overflowY: attr.noScroll ? "hidden" : "auto" }}
      >
        {areChildrenMounted ? children : null}
      </div>
    </div>
  );
}

export default GridstackItem;
