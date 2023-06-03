import React, { useEffect, useState, useRef } from "react";
import "gridstack/dist/gridstack-extra.min.css";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import getUpdatedLayout from "./utils/getUpdatedLayout";
import { MasterGridContext, UpdateLayoutContext } from "./contexts";
import getGridOptions from "./utils/getGridOptions.js";

export default function GridstackLayout(props) {
  const grid = useRef();
  const gridContainerElement = useRef();
  const masterGridOptions = getGridOptions(props);

  const [areChildrenMounted, setAreChildrenMounted] = useState(false);

  const attachEventListeners = () => {
    grid.current.on("added change", (event, items) => {
      updateLayout(items);
    });
  };

  const updateLayout = (items) => {
    for (const item of items) {
      setLayout((prevLayout) => {
        return getUpdatedLayout(prevLayout, item);
      });
    }
  };

  useEffect(() => {
    if (!areChildrenMounted) {
      grid.current = GridStack.init(
        masterGridOptions,
        gridContainerElement.current
      );
      attachEventListeners();
      setAreChildrenMounted(true);
    } else {
      throw new Error(
        "Fatal error: Must not initialize Gridstack instance multiple times."
      );
    }
    return () => {
      grid.current.destroy(); // Doesn't work!
    };
    // eslint-disable-next-line
  }, []);

  const { setLayout, children } = props;
  return (
    <MasterGridContext.Provider value={grid.current}>
      <UpdateLayoutContext.Provider value={updateLayout}>
        <div className="grid-stack" ref={gridContainerElement}>
          {areChildrenMounted && children}
        </div>
      </UpdateLayoutContext.Provider>
    </MasterGridContext.Provider>
  );
}
