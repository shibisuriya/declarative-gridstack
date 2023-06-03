import React, { Fragment, useEffect, useRef } from "react";
import "gridstack/dist/gridstack-extra.min.css";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import getUpdatedLayout from "./utils/getUpdatedLayout";
import {
  MasterGridContext,
  MasterGridOptionsContext,
  UpdateLayoutContext,
} from "./contexts";
import getGridOptions from "./utils/getGridOptions.js";

export default function GridstackLayout(props) {
  const grid = useRef();
  const gridContainerElement = useRef();
  const masterGridOptions = getGridOptions(props);
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
    setTimeout(() => {
      props.layoutChanged();
    }, 100);
  };

  const init = () => {
    grid.current = GridStack.init(
      masterGridOptions,
      gridContainerElement.current
    );
    attachEventListeners();
  };

  useEffect(() => {
    init();
    return () => {
      grid.current.destroy();
    };
    // eslint-disable-next-line
  }, []);

  const { setLayout, children } = props;
  return (
    <Fragment>
      <MasterGridContext.Provider value={grid}>
        <MasterGridOptionsContext.Provider value={masterGridOptions}>
          <UpdateLayoutContext.Provider value={updateLayout}>
            <div className="grid-stack" ref={gridContainerElement}>
              {children}
            </div>
          </UpdateLayoutContext.Provider>
        </MasterGridOptionsContext.Provider>
      </MasterGridContext.Provider>
    </Fragment>
  );
}
