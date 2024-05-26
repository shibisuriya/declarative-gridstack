import React, { useContext, useEffect, useRef, useState } from "react";
import { MasterGridContext, SubgridContext } from "./contexts";

function GridstackItem(props) {
  // First invoke init() in the Grid component
  // then mount children (either grid items or subgrid containing more grid items)
  // and call makeWidget() or Grid.addSubgrid()...

  const [areChildrenMounted, setAreChildrenMounted] = useState(false);

  // To ensure that the user's changes to certain props do not affect the initialized gs-item, it is important to make a copy of these props. The props that should not be mutated by the user after the gs-item has been initialized are x, y, w, h, and id. Once the gs-item has been initialized, the user should refrain from modifying these specific props.
  const { x, y, w, h, id, noScroll = false, className = "", children } = props;
  const [item] = useState({ x, y, w, h, id, noScroll, className });

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
    // Will areChildrenMounted only ones.
    if (!areChildrenMounted) {
      getGrid().makeWidget(gsItemElement.current);
      setAreChildrenMounted(true);
    }
  }, []);

  return (
    <div
      ref={gsItemElement}
      className={`grid-stack-item ${item.className}`}
      gs-x={item.x}
      gs-y={item.y}
      gs-w={item.w}
      gs-h={item.h}
      gs-id={item.id}
      gs-no-resize={item.noResize}
    >
      <div
        className="grid-stack-item-content"
        style={{ overflowY: item.noScroll ? "hidden" : "auto" }}
      >
        {areChildrenMounted ? children : null}
      </div>
    </div>
  );
}

export default GridstackItem;
