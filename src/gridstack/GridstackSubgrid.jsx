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
    removeItemFromModel(itemId);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        remove: removeItem,
      };
    },
    []
  );

  const subgridRef = useRef();
  const subgrid = useRef();

  const subgridOptions = getGridOptions(props);

  const updateLayout = useContext(UpdateLayoutContext);

  const attachEventListeners = () => {
    subgrid.current.on("added change", (event, items) => {
      updateLayout(items);
    });
  };
  useEffect(() => {
    if (!areChildrenMounted) {
      subgrid.current = GridStack.addGrid(subgridRef.current, subgridOptions);
      attachEventListeners();
      setAreChildrenMounted(true);
    } else {
      throw new Error(
        "Fatal error: Must not initialize Gridstack subgrid multiple times."
      );
    }
    // eslint-disable-next-line
  }, []);
  const { children } = props;
  return (
    <SubgridContext.Provider value={subgrid.current}>
      {
        <div className="grid-stack" ref={subgridRef}>
          {areChildrenMounted && children}
        </div>
      }
    </SubgridContext.Provider>
  );
});

export default GridstackSubgrid;
