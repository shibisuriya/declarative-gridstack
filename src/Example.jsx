import React, { useEffect } from "react";
import {
  GridstackContainer,
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
    return () => {
      // perform cleanup here if necessary
      console.log("Component unmounted!");
    };
  }, []); // empty dependency array to ensure it only runs once
  const widgetStyles = {
    border: "1px solid red",
    margin: "10px",
  };

  return (
    <div>
      {layout.map((widget, index) => {
        return (
          <div style={widgetStyles} key={index}>
            <div>id: {widget.id}</div>
            <div>x: {widget.x}</div>
            <div>y: {widget.y}</div>
            <div>w: {widget.w}</div>
            <div>h: {widget.h}</div>
          </div>
        );
      })}
      <GridstackContainer layout={{ layout, setLayout }}>
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
