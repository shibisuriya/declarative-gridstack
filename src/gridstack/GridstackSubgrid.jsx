import React, { useContext, useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";
import { SubgridContext, UpdateLayoutContext } from "./contexts";
import getGridOptions from "./utils/getGridOptions";

function GridstackSubgrid(props) {
  const [areChildrenMounted, setAreChildrenMounted] = useState(false);

  const subgridRef = useRef();
  const subgrid = useRef();

  const subgridOptions = getGridOptions(props);

  const updateLayout = useContext(UpdateLayoutContext);

  const attachEventListeners = () => {
    subgrid.current.on("added change", (event, items) => {
      updateLayout(items);
    });
  };
  useEffect(() => {
    if (!areChildrenMounted) {
      subgrid.current = GridStack.addGrid(subgridRef.current, subgridOptions);
      attachEventListeners();
      setAreChildrenMounted(true);
    } else {
      throw new Error(
        "Fatal error: Must not initialize Gridstack subgrid multiple times."
      );
    }
    // eslint-disable-next-line
  }, []);
  const { children } = props;
  return (
    <SubgridContext.Provider value={subgrid.current}>
      {
        <div className="grid-stack" ref={subgridRef}>
          {areChildrenMounted && children}
        </div>
      }
    </SubgridContext.Provider>
  );
}

export default GridstackSubgrid;
