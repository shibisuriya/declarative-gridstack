import React, { useState } from "react";
import {
  GridstackContainer,
  GridstackItem,
} from "@declarative-gridstack/react";
import { Widget } from "./components/Widget.jsx";

import "./styles.css";

function Simple() {
  const [layout, setLayout] = useState([
    {
      id: "1",
      x: 0,
      y: 0,
      w: 6,
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
      <div className="row">
        <div className="flex-1 bg">
          <GridstackContainer items={layout} setLayout={setLayout}>
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
      </div>
    </div>
  );
}

export default Simple;
