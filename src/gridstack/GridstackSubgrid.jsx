import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { GridStack } from "gridstack";
import {
  SubgridContext,
  UpdateLayoutContext,
  RemoveItemFromModelContext,
} from "./contexts";
import getGridOptions from "./utils/getGridOptions";

const GridstackSubgrid = React.forwardRef((props, ref) => {
  const [areChildrenMounted, setAreChildrenMounted] = useState(false);

  const removeItemFromModel = useContext(RemoveItemFromModelContext);

  const getItemElementUsingId = (id) => {
    return subgridRef.current.querySelector(`.grid-stack-item[gs-id="${id}"]`);
  };

  const removeItem = (itemId) => {
    const itemElem = getItemElementUsingId(itemId);
    subgrid.current.removeWidget(itemElem, false); // RemoveDOM = false, don't remove DOM.
  };

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
  const isGridDestroyed = useRef();
  const subgrid = useRef();

  const subgridOptions = getGridOptions(props);

  const updateLayout = useContext(UpdateLayoutContext);

  const attachEventListeners = () => {
    subgrid.current.on("added change", (event, items) => {
      updateLayout(items);
    });

    subgrid.current.on("removed", (event, items) => {
      if (!isGridDestroyed.current) {
        for (let item of items) {
          removeItemFromModel(item.id);
        }
      }
    });
  };
  useEffect(() => {
    if (!areChildrenMounted) {
      const { accept } = props;
      subgrid.current = GridStack.addGrid(subgridRef.current, {
        ...subgridOptions,
        acceptWidgets: (el) => {
          const classList = new Set(el.classList);
          for (let i = 0; i < accept.length; i++) {
            if (classList.has(accept[i])) {
              return true;
            }
          }
          return false;
        },
      });
      attachEventListeners();
      setAreChildrenMounted(true);
      isGridDestroyed.current = false;
    } else {
      throw new Error(
        "Fatal error: Must not initialize Gridstack subgrid multiple times."
      );
    }
    return () => {
      if (!isGridDestroyed.current) {
        isGridDestroyed.current = true;
        subgrid.current.destroy(false); // Destroy grid but don't remove all the DOM nodes... React will do that for you.
      } else {
        throw new Error(
          "Fatal error: We are trying to destory a subgrid that has already been destroyed."
        );
      }
    };
    // eslint-disable-next-line
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
