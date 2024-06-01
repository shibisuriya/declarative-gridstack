import React, { useState, useRef } from "react";
import {
  GridstackContainer,
  GridstackItem,
} from "@declarative-gridstack/react";
import { Widget } from "./components/Widget";
import ItemContainer from "./components/ItemContainer";

import "./styles.css";

function Remove() {
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
    {
      id: "2",
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

  const remove = (id) => {
    gridRef.current.remove(id);
  };

  return (
    <div>
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
                  <ItemContainer remove={() => remove(widget.id)}>
                    <Widget data={widget.data} />
                  </ItemContainer>
                </GridstackItem>
              );
            })}
          </GridstackContainer>
        </div>
      </div>
    </div>
  );
}

export default Remove;
