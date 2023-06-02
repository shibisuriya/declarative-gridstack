import React, { Fragment, useEffect, useRef } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import { MasterGridContext } from "./contexts";
export default function GridstackLayout(props) {
  const grid = useRef();
  const gridContainerElement = useRef();

  const attachEventListeners = () => {
    grid.current.on("added change", (event, items) => {
      const { setLayout } = props;
      for (const item of items) {
        const { x, y, w, h, id } = item;
        setLayout((prevLayout) => {
          return prevLayout.map((item) => {
            if (item.id === id) {
              item = { ...item, x, y, w, h };
            }
            return item;
          });
        });
      }
    });
  };

  const init = () => {
    grid.current = GridStack.init(gridContainerElement.current);
    attachEventListeners();
  };

  useEffect(() => {
    init();
    return () => {
      grid.current.destory();
    };
    // eslint-disable-next-line
  }, []);

  const { children } = props;

  return (
    <Fragment>
      <MasterGridContext.Provider value={grid}>
        <div className="grid-stack" ref={gridContainerElement}>
          {children}
        </div>
      </MasterGridContext.Provider>
    </Fragment>
  );
}
