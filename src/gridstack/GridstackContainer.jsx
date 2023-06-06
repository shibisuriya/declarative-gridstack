import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import "gridstack/dist/gridstack-extra.min.css";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import getUpdatedLayout from "./utils/getUpdatedLayout";
import {
  MasterGridContext,
  UpdateLayoutContext,
  RemoveItemFromModelContext,
} from "./contexts";
import getGridOptions from "./utils/getGridOptions.js";

const GridstackLayout = React.forwardRef((props, ref) => {
  const grid = useRef();
  const gridContainerElement = useRef();
  const masterGridOptions = getGridOptions(props);

  useImperativeHandle(
    ref,
    () => {
      return {
        remove: removeItem,
      };
    },
    []
  );

  const getItemElementUsingId = (id) => {
    return gridContainerElement.current.querySelector(
      `.grid-stack-item[gs-id="${id}"]`
    );
  };

  const removeItem = (itemId) => {
    const itemElem = getItemElementUsingId(itemId);
    grid.current.removeWidget(itemElem, false); // RemoveDOM = false, don't remove DOM.
    removeItemFromModel(itemId);
  };

  const removeItemFromModel = (itemId) => {
    setLayout((prevlayout) => {
      const removeItemById = (id, prevLayout) => {
        return prevLayout.filter((item) => {
          if (item.id === id) {
            return false; // Skip the item to remove it
          }
          if (item.children) {
            item.children = removeItemById(id, item.children);
          }
          return true; // Keep the item
        });
      };
      return removeItemById(itemId, prevlayout);
    });
  };

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
        <RemoveItemFromModelContext.Provider value={removeItemFromModel}>
          <div className="grid-stack" ref={gridContainerElement}>
            {areChildrenMounted && children}
          </div>
        </RemoveItemFromModelContext.Provider>
      </UpdateLayoutContext.Provider>
    </MasterGridContext.Provider>
  );
});

export default GridstackLayout;
