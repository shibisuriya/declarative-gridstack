import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { GridStack } from "@declarative-gridstack/core";
import {
  SubgridContext,
  UpdateLayoutContext,
  RemoveItemFromModelContext,
  AddItemToModelContext,
  ItemStoreContext,
} from "./contexts";
import getGridOptions from "./utils/getGridOptions";
import { cloneDeep } from "lodash";

const GridstackSubgrid = React.forwardRef((props, ref) => {
  const [areChildrenMounted, setAreChildrenMounted] = useState(false);

  const removeItemFromModel = useContext(RemoveItemFromModelContext);
  const addItemToModel = useContext(AddItemToModelContext);
  const itemStore = useContext(ItemStoreContext);

  const getItemElementUsingId = (id) => {
    return subgridRef.current.querySelector(`.grid-stack-item[gs-id="${id}"]`);
  };

  const removeItem = (itemId) => {
    const itemElem = getItemElementUsingId(itemId);
    subgrid.current.removeWidget(itemElem, false); // RemoveDOM = false, don't remove DOM.
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

  const subgridRef = useRef();
  const subgrid = useRef();

  const subgridOptions = useRef(getGridOptions(props));

  const updateLayout = useContext(UpdateLayoutContext);

  const attachEventListeners = () => {
    subgrid.current.on("added change", (event, items) => {
      const { dnd, gridId } = props;
      for (let item of items) {
        const { w, h, x, y } = item;
        if (!("id" in item)) {
          // The item has been dragged and dropped from outside! By 'outside' I mean that the item was not part of any grid!
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
              addItemToModel(dndItem, gridId); // Push item to the layout.
            }
            subgrid.current.removeWidget(item.el, true);
          } else {
            throw new Error(
              "Fatal error: Please supply a UID generator to the grid to support drag and drop of items which doesn't belong to any gridstack grid."
            );
          }
        } else if (itemsHash.current[item.id]) {
          // The item is part of this grid only...
          Object.assign(itemsHash.current[item.id], { w, h, x, y });
          updateLayout(item);
        } else if (itemStore.isPresent(item.id)) {
          // The grid item is coming from another grid. User has dragged and dropped an item belonging to another grid.
          const retrievedItem = itemStore.retrieve();
          Object.assign(retrievedItem, { x, y, w, h });
          itemStore.clear();
          itemsHash.current[retrievedItem.id] = retrievedItem;
          addItemToModel(retrievedItem, gridId); // Push item to the layout.
          // Add the retrieved item to this grid, since it was dropped on this particular grid!
        } else {
          throw new Error("Item not present in the current grid!");
        }
      }
    });

    subgrid.current.on("removed", (event, items) => {
      for (let item of items) {
        // Dnd items dont' have id, they have _id!
        if ("id" in item) {
          if ("_temporaryRemoved" in item) {
            // This particular item is removed from a grid, and will be added to another grid... This happens when the user drags and drop a
            // grid item from one grid to another.
            const itemToStore = itemsHash.current[item.id];
            if (itemToStore) {
              itemStore.store(itemToStore);
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

  useEffect(() => {
    if (!areChildrenMounted) {
      setAreChildrenMounted(true);
    } else {
      throw new Error(
        "Fatal error: Must not initialize Gridstack subgrid multiple times."
      );
    }
  }, []);

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

    subgrid.current = GridStack.addGrid(subgridRef.current, {
      ...subgridOptions.current,
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
    });
    attachEventListeners();
    return () => {
      subgrid.current.off("removed added change");
    };
  }, [props.items.length]);

  useEffect(() => {
    return () => {
      if (subgrid.current) {
        subgrid.current.destroy(false); // Destroy grid but don't remove all the DOM nodes... React will do that for you.
      } else {
        throw new Error(
          "Fatal error: We are trying to destory a subgrid that has already been destroyed."
        );
      }
    };
  }, []);
  const { children } = props;
  return (
    <SubgridContext.Provider value={subgrid.current}>
      {
        <div className="grid-stack" ref={subgridRef}>
          {areChildrenMounted ? children : null}
        </div>
      }
    </SubgridContext.Provider>
  );
});

export default GridstackSubgrid;
