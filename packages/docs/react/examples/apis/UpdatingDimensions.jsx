import React, { useState, useRef } from "react";
import { GridstackContainer, GridstackItem } from "../../gridstack";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { Widget } from "../components/Widget";

import "./styles.css";

function UpdatingDimensions() {
  const updateWidth = () => {
    gridRef.current.updateItem("1", { w: 2, h: 3 });
  };
  const gridRef = useRef();
  const [layout, setLayout] = useState([
    {
      id: "1",
      x: 0,
      y: 0,
      w: 12,
      h: 2,
      data: {
        type: "calendar",
        title: "A calendar widget",
        data: "10/10/1990",
      },
    },
  ]);
  return (
    <div>
      <div>
        <button onClick={updateWidth}>Update width</button>
      </div>
      <div className="row">
        <div className="flex-1">
          <GridstackContainer
            items={layout}
            setLayout={setLayout}
            ref={gridRef}
          >
            {layout.map((widget) => {
              return (
                <GridstackItem
                  key={widget.id}
                  id={widget.id}
                  x={widget.x}
                  y={widget.y}
                  w={widget.w}
                  h={widget.h}
                >
                  <Widget data={widget.data} />
                </GridstackItem>
              );
            })}
          </GridstackContainer>
        </div>
        <div className="flex-1">
          <JsonView data={layout} style={darkStyles} class="json-viewer" />
        </div>
      </div>
    </div>
  );
}

export default UpdatingDimensions;
