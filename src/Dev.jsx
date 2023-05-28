import React, { useEffect, useState } from "react";
import { GridstackContainer, GridstackItem } from "./gridstack";
import { MapWidget, CalendarWidget } from "./components/widgets";

export default function Example() {
  const [layout, setLayout] = useState([
    {
      id: "1",
      x: 1,
      y: 1,
      w: 2,
      h: 2,
      data: { type: "calendar", title: "A calendar widget", data: Date.now() },
    },
    {
      id: "2",
      x: 1,
      y: 1,
      w: 2,
      h: 2,
      data: {
        type: "map",
        title: "A map widget",
        data: "Chennai, Tamil Nadu, India",
      },
    },
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
      {layout.map((item) => {
        return (
          <div style={widgetStyles} key={item.id}>
            <div>id: {item.id}</div>
            <div>x: {item.x}</div>
            <div>y: {item.y}</div>
            <div>w: {item.w}</div>
            <div>h: {item.h}</div>
          </div>
        );
      })}
      <GridstackContainer setLayout={setLayout}>
        {layout.map((item) => {
          const {
            data,
            data: { type },
          } = item ?? {};
          const getWidget = () => {
            if (type === "calendar") {
              return <CalendarWidget data={data} />;
            } else if (item.data.type === "map") {
              return <MapWidget data={data} />;
            }
          };
          const widget = getWidget();
          return (
            <GridstackItem
              key={item.id}
              id={item.id}
              x={item.x}
              y={item.y}
              w={item.w}
              h={item.h}
            >
              {widget}
            </GridstackItem>
          );
        })}
      </GridstackContainer>
    </div>
  );
}
