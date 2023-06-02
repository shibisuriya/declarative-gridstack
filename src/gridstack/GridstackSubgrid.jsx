import React, { Fragment, useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";
import { SubgridContext } from "./contexts";

function GridstackSubgrid(props) {
  const [mountSubgrid, setMountSubgrid] = useState(false);
  const [mountChildren, setMountChildren] = useState(false);
  const subgridRef = useRef();
  const subgrid = useRef();
  useEffect(() => {
    if (!mountSubgrid) {
      setMountSubgrid(true);
    } else {
      subgrid.current = GridStack.addGrid(subgridRef.current);
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
