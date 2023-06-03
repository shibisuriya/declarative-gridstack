import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GridStack } from "gridstack";
import { SubgridContext, UpdateLayoutContext } from "./contexts";
import getGridOptions from "./utils/getGridOptions";

function GridstackSubgrid(props) {
  const [mountSubgrid, setMountSubgrid] = useState(false);
  const [mountChildren, setMountChildren] = useState(false);
  const subgridRef = useRef();
  const subgrid = useRef();
  const subgridOptions = getGridOptions(props);
  const updateLayout = useContext(UpdateLayoutContext);
  // const {} = props;
  // const subgridOptions = {};
  const attachEventListeners = () => {
    subgrid.current.on("added change", (event, items) => {
      updateLayout(items);
    });
  };
  useEffect(() => {
    if (!mountSubgrid) {
      setMountSubgrid(true);
    } else {
      subgrid.current = GridStack.addGrid(subgridRef.current, subgridOptions);
      attachEventListeners();
      setMountChildren(true);
    }
  }, [mountSubgrid]);
  const { children } = props;
  return (
    <Fragment>
      <SubgridContext.Provider value={subgrid.current}>
        {
          <div className="grid-stack" ref={subgridRef}>
            {mountChildren && children}
          </div>
        }
      </SubgridContext.Provider>
    </Fragment>
  );
}

export default GridstackSubgrid;
