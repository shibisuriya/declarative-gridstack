import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import cloneDeep from "lodash/cloneDeep";
import { MasterGridContext, SubgridContext } from "./contexts";

export default function GridstackItem(props) {
  const [itemMounted, setItemMounted] = useState(false);
  const gsItemElement = useRef();
  const masterGrid = useContext(MasterGridContext).current;
  const subgrid = useContext(SubgridContext);
  console.log("MasterGridContext -> ", masterGrid);
  useEffect(() => {
    console.log("item useEffect invoked! ", Date.now());
    if (!itemMounted) {
      setItemMounted(true);
    } else {
      if (subgrid) {
        subgrid.makeWidget(gsItemElement.current);
      } else if (masterGrid) {
        masterGrid.makeWidget(gsItemElement.current);
      } else {
        throw new Error("Grid container not found!");
      }
    }
    return () => {};
    // eslint-disable-next-line
  }, [itemMounted]);

  // Copy the props which should not be mutated by the user, when the user changes a prop after the gs-item has
  // been initialized it should not effect the gs-item. Ones the gs-item has been initialized the user shouldn't
  // change the following, x, y, w, h and id.
  const { x, y, w, h, id } = props;
  const attr = cloneDeep({ x, y, w, h, id });
  return (
    <Fragment>
      {itemMounted && (
        <div
          ref={gsItemElement}
          className="grid-stack-item"
          gs-x={attr.x}
          gs-y={attr.y}
          gs-w={attr.w}
          gs-h={attr.h}
          gs-id={attr.id}
          gs-no-resize={attr.noResize}
        >
          <div
            className="grid-stack-item-content"
            style={{ overflowY: props.noScroll ? "hidden" : "auto" }}
          >
            {props.children}
          </div>
        </div>
      )}
    </Fragment>
  );
}
