import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import "gridstack/dist/gridstack-extra.min.css";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import getUpdatedLayout from "./utils/getUpdatedLayout";
import {
  MasterGridContext,
  UpdateLayoutContext,
  RemoveItemFromModelContext,
  AddItemToModelContext,
} from "./contexts";
import getGridOptions from "./utils/getGridOptions.js";
import cloneDeep from "lodash/cloneDeep";

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

  const addItemToModel = (newItem, gridId) => {
    if (gridId == "master") {
      setLayout((prevLayout) => [...prevLayout, newItem]);
    } else {
      setLayout((prevLayout) => {
        const getNewLayout = (layout, newItem) => {
          return layout.map((item) => {
            if ("children" in item && gridId == item.id) {
              return {
                ...item,
                children: [...item.children, newItem],
              };
            } else if ("children" in item) {
              return {
                ...item,
                children: getNewLayout(item.children, newItem),
              };
            } else {
              return item;
            }
          });
        };
        return getNewLayout(prevLayout, newItem);
      });
    }
  };

  const [areChildrenMounted, setAreChildrenMounted] = useState(false);

  const attachEventListeners = () => {
    grid.current.on("added change", (event, items) => {
      for (let item of items) {
        if (!("id" in item)) {
          // The item has been dragged and dropped from outside!
          const { dnd } = props;
          const { dndItems } = dnd;
          if ("uidGenerator" in dnd) {
            const { x, y, w, h, el } = item;
            const dndItemId = el.getAttribute("gs-dnd-item-id");
            if (dndItemId in dndItems) {
              const dndItem = cloneDeep(dndItems[dndItemId]);
              Object.assign(dndItem, {
                x,
                y,
                w,
                h,
                id: String(dnd.uidGenerator()),
              });
              addItemToModel(dndItem, "master"); // Push item to the layout.
            }
            grid.current.removeWidget(item.el, true);
          } else {
            throw new Error(
              "Fatal error: Please supply a UID generator to the grid to support drag and drop of items which doesn't belong to any gridstack grid."
            );
          }
        } else if (false) {
          // The item should not be the part of this grid.
        } else {
          // Item already exists in the layout model.
          updateLayout(item);
        }
      }
    });

    grid.current.on("removed", (event, items) => {
      // Don't update the model if the grid is destoryed.
      if (!isGridDestroyed.current) {
        for (let item of items) {
          // Dnd items dont' have id, they have _id!
          if ("id" in item) {
            removeItemFromModel(item.id);
          }
        }
      }
    });
  };

  const updateLayout = (item) => {
    setLayout((prevLayout) => {
      return getUpdatedLayout(prevLayout, item);
    });
  };

  useEffect(() => {
    if (!areChildrenMounted) {
      const { accept = [], dnd } = props;

      const getDndOptions = () => {
        const { dnd } = props;
        const { options, shredder } = dnd ?? {};
        if (dnd?.class) {
          const gridstackDragAndDropOptions = {
            dragIn: dnd.class,
          };
          if (options) {
            gridstackDragAndDropOptions["dragInOptions"] = options;
          }
          if (shredder) {
            gridstackDragAndDropOptions["removable"] = shredder;
          }
          return gridstackDragAndDropOptions;
        } else {
          return {};
        }
      };

      grid.current = GridStack.init(
        {
          ...masterGridOptions,
          ...getDndOptions(),
          acceptWidgets: (el) => {
            const classList = new Set(el.classList);
            for (let i = 0; i < accept.length; i++) {
              if (classList.has(accept[i]) || classList.has(dnd?.class ?? "")) {
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
          <AddItemToModelContext.Provider value={addItemToModel}>
            <div className="grid-stack" ref={gridContainerElement}>
              {areChildrenMounted ? children : null}
            </div>
          </AddItemToModelContext.Provider>
        </RemoveItemFromModelContext.Provider>
      </UpdateLayoutContext.Provider>
    </MasterGridContext.Provider>
  );
});

export default GridstackLayout;
