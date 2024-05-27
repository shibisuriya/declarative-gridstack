import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import "@declarative-gridstack/core/dist/gridstack-extra.min.css";
import "@declarative-gridstack/core/dist/gridstack.min.css";
import { GridStack } from "@declarative-gridstack/core";
import getUpdatedLayout from "./utils/getUpdatedLayout";
import {
  MasterGridContext,
  UpdateLayoutContext,
  RemoveItemFromModelContext,
  AddItemToModelContext,
  ItemStoreContext,
} from "./contexts";
import getGridOptions from "./utils/getGridOptions.js";
import { cloneDeep } from "lodash";

const GridstackLayout = React.forwardRef((props, ref) => {
  const grid = useRef();
  const gridContainerElement = useRef();
  const masterGridOptions = useRef(getGridOptions(props));

  const { setLayout, children } = props;

  const updateItem = (id, dimension) => {
    const item = getItemElementUsingId(id);
    grid.current.update(item, dimension);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        remove: removeItem,
        updateItem: updateItem,
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

  const itemsHash = useRef(); // Make a hash of props.items, always keep itemsHash in sync with props.items

  useEffect(() => {
    const { items } = props;
    itemsHash.current = items.reduce((hash, item) => {
      const { id } = item;
      hash[id] = item;
      return hash;
    }, {});
  }, [props.items.length]);

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
    if (gridId === "master") {
      setLayout((prevLayout) => [...prevLayout, newItem]);
    } else {
      setLayout((prevLayout) => {
        const getNewLayout = (layout, newItem) => {
          return layout.map((item) => {
            if ("children" in item && String(gridId) === String(item.id)) {
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
        const { x, y, w, h, el, id } = item;
        if (!("id" in item)) {
          // The item has been dragged and dropped from outside!
          const { dnd } = props;
          const { dndItems } = dnd;
          if ("uidGenerator" in dnd) {
            const dndItemId = el.getAttribute("gs-dnd-item-id");
            const dndItem = cloneDeep(
              dndItems.find(
                (dndItem) => String(dndItem.id) === String(dndItemId)
              )
            );
            if (dndItem) {
              Object.assign(dndItem, {
                x,
                y,
                w,
                h,
                id: String(dnd.uidGenerator()),
              });
              addItemToModel(dndItem, "master"); // Push item to the layout.
              itemsHash.current[dndItem.id] = dndItem;
            }
            grid.current.removeWidget(item.el, true);
          } else {
            throw new Error(
              "Fatal error: Please supply a UID generator to the grid to support drag and drop of items which doesn't belong to any gridstack grid."
            );
          }
        } else if (itemsHash.current[item.id]) {
          // The item is part of this grid only...
          Object.assign(itemsHash.current[item.id], { w, h, x, y });
          updateLayout(item);
        } else if (itemStore.current.isPresent(item.id)) {
          // The grid item is coming from another grid. User has dragged and dropped an item belonging to another grid.
          const retrievedItem = itemStore.current.retrieve();
          Object.assign(retrievedItem, { x, y, w, h });
          itemStore.current.clear();
          itemsHash.current[retrievedItem.id] = retrievedItem;
          addItemToModel(retrievedItem, "master"); // Push item to the layout.
          // Add the retrieved item to this grid, since it was dropped on this particular grid!
        } else {
          throw new Error(
            `Item with id ${id} not present in the current grid!`
          );
        }
      }
    });

    grid.current.on("removed", (event, items) => {
      // Don't update the model if the grid is destoryed.

      for (let item of items) {
        // Dnd items dont' have id, they have _id!
        if ("id" in item) {
          if ("_temporaryRemoved" in item) {
            // This particular item is removed from a grid, and will be added to another grid... This happens when the user drags and drop a
            // grid item from one grid to another.
            const itemToStore = itemsHash.current[item.id];
            if (itemToStore) {
              itemStore.current.store(itemToStore);
            } else {
              throw new Error(
                "Item `_temporaryRemoved` from a grid, but the item is not even present in that particular grid!"
              );
            }
          }
          delete itemsHash.current[item.id];
          removeItemFromModel(item.id);
        }
      }
    });
  };

  const updateLayout = (item) => {
    if (item) {
      setLayout((prevLayout) => {
        return getUpdatedLayout(prevLayout, item);
      });
    } else {
      throw new Error("No item supplied, how do I update the layout?");
    }
  };

  const store = useRef();
  const itemStore = useRef({
    isPresent: function (id) {
      return store.current?.id === id;
    },
    store: function (item) {
      store.current = cloneDeep(item);
    },
    retrieve: function () {
      if (store.current) {
        return store.current;
      } else {
        throw new Error("Can't retrive item from an empty itemStore!");
      }
    },
    clear: function () {
      store.current = null;
      console.log("store cleared, data stored in store = ", store);
    },
  });

  useEffect(() => {
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

    if (!grid.current) {
      grid.current = GridStack.init(
        {
          ...masterGridOptions.current,
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
    }

    attachEventListeners();

    return () => {
      grid.current.off("added change removed");
    };
  }, [props.items]);

  useEffect(() => {
    if (!areChildrenMounted) {
      setAreChildrenMounted(true);
    } else {
      throw new Error(
        "Fatal error: Must not initialize Gridstack instance multiple times."
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      if (grid.current) {
        grid.current.destroy(false); // Destroy grid but don't remove all the DOM nodes... React will do that for you.
      } else {
        throw new Error(
          "Fatal error: Trying to destory a grid that has already been destroyed."
        );
      }
    };
  }, []);

  return (
    <MasterGridContext.Provider value={grid.current}>
      <UpdateLayoutContext.Provider value={updateLayout}>
        <RemoveItemFromModelContext.Provider value={removeItemFromModel}>
          <AddItemToModelContext.Provider value={addItemToModel}>
            <ItemStoreContext.Provider value={itemStore.current}>
              <div className="grid-stack" ref={gridContainerElement}>
                {areChildrenMounted ? children : null}
              </div>
            </ItemStoreContext.Provider>
          </AddItemToModelContext.Provider>
        </RemoveItemFromModelContext.Provider>
      </UpdateLayoutContext.Provider>
    </MasterGridContext.Provider>
  );
});

export default GridstackLayout;
