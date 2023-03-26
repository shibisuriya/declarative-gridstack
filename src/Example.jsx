import React, { useEffect } from "react";
import {
  GridstackContainer,
  GridstackSubgrid,
  GridstackItem,
} from "./gridstack";
import DummyWidget from "./DummyWidget.jsx";
import { useState } from "react";

export default function Example() {
  const [layout, setLayout] = useState([
    { data: "4321", id: "1", x: 1, y: 1, w: 2, h: 2 },
    { data: "1234", id: "2", x: 1, y: 1, w: 2, h: 2 },
  ]);
  useEffect(() => {
    // perform initialization or setup here
    console.log("Component mounted!");
    // return a cleanup function if necessary
    return () => {
      // perform cleanup here if necessary
      console.log("Component unmounted!");
    };
  }, []); // empty dependency array to ensure it only runs once

  return (
    <div>
      <GridstackContainer>
        {layout.map((item) => {
          return (
            <GridstackItem
              key={item.id}
              item={item}
              x={item.x}
              y={item.y}
              w={item.w}
              h={item.h}
            >
              <DummyWidget data={item.data} />
            </GridstackItem>
          );
        })}
      </GridstackContainer>
    </div>
  );
}
