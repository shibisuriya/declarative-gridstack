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
  const isGridDestroyed = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        remove: removeItem,
      };
    },
    // eslint-disable-next-line
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

    grid.current.on("removed", (event, items) => {
      // Don't update the model if the grid is destoryed.
      if (!isGridDestroyed.current) {
        for (let item of items) {
          removeItemFromModel(item.id);
        }
      }
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
      const { accept = [] } = props;
      grid.current = GridStack.init(
        {
          ...masterGridOptions,
          acceptWidgets: (el) => {
            const classList = new Set(el.classList);
            for (let i = 0; i < accept.length; i++) {
              if (classList.has(accept[i])) {
                return true;
              }
            }
            return false;
          },
        },
        gridContainerElement.current
      );
      isGridDestroyed.current = false;
      attachEventListeners();
      setAreChildrenMounted(true);
    } else {
      throw new Error(
        "Fatal error: Must not initialize Gridstack instance multiple times."
      );
    }
    return () => {
      if (!isGridDestroyed.current) {
        isGridDestroyed.current = true;
        grid.current.destroy(false); // Destroy grid but don't remove all the DOM nodes... React will do that for you.
      } else {
        throw new Error(
          "Fatal error: Trying to destory a grid that has already been destroyed."
        );
      }
    };
    // eslint-disable-next-line
  }, []);

  const { setLayout, children } = props;
  return (
    <MasterGridContext.Provider value={grid.current}>
      <UpdateLayoutContext.Provider value={updateLayout}>
        <RemoveItemFromModelContext.Provider value={removeItemFromModel}>
          <div className="grid-stack" ref={gridContainerElement}>
            {areChildrenMounted ? children : null}
          </div>
        </RemoveItemFromModelContext.Provider>
      </UpdateLayoutContext.Provider>
    </MasterGridContext.Provider>
  );
});

export default GridstackLayout;
