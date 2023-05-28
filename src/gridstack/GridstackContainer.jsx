import React, { useEffect } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
export default function GridstackLayout(props) {
  let grid;

  const attachEventListeners = () => {
    grid.on("added change", (event, items) => {
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
    grid = GridStack.init();
    attachEventListeners();
  };

  useEffect(() => {
    init();
    return () => {
      grid.destory();
    };
    // eslint-disable-next-line
  }, []);

  const { children } = props;

  return <div className="grid-stack">{children}</div>;
}
