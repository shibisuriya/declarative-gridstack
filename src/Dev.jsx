import React, { useEffect, useState } from "react";
import {
  GridstackContainer,
  GridstackItem,
  GridstackSubgrid,
} from "./gridstack";
import { MapWidget, CalendarWidget } from "./components/widgets";

function Dev() {
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
      w: 6,
      h: 3,
      children: [
        {
          id: "3",
          x: 1,
          y: 1,
          w: 1,
          h: 1,
          data: {
            type: "map",
            title: "A map widget",
            data: "Chennai, Tamil Nadu, India",
          },
        },
        {
          id: "4",
          x: 1,
          y: 1,
          w: 1,
          h: 1,
          data: {
            type: "map",
            title: "A map widget",
            data: "Chennai, Tamil Nadu, India",
          },
        },
      ],
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

  const getWidget = (type, data) => {
    if (type === "calendar") {
      return <CalendarWidget data={data} />;
    } else if (type === "map") {
      return <MapWidget data={data} />;
    }
  };

  const getItem = (item) => {
    const {
      data,
      data: { type },
    } = item ?? {};
    const widget = getWidget(type, data);
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
          if ("children" in item) {
            // is a subgrid!
            const { children } = item;
            return (
              <GridstackItem
                key={item.id}
                id={item.id}
                x={item.x}
                y={item.y}
                w={item.w}
                h={item.h}
              >
                <GridstackSubgrid items={children} key={item.id}>
                  {children.map((child) => {
                    return getItem(child);
                  })}
                </GridstackSubgrid>
              </GridstackItem>
            );
          } else {
            return getItem(item);
          }
        })}
      </GridstackContainer>
    </div>
  );
}
export default Dev;
