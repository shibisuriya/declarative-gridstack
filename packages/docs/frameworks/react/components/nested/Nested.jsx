import React, { useState } from "react";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import {
  GridstackContainer,
  GridstackItem,
  GridstackSubgrid,
} from "@declarative-gridstack/react";

import "./styles.css";

const MapWidget = ({ data }) => {
  const { title } = data;
  return <div className="map-widget widget">{title}</div>;
};

const CalendarWidget = ({ data }) => {
  const { title } = data;
  return <div className="calendar-widget widget">{title}</div>;
};

function Nested() {
  const [layout, setLayout] = useState([
    {
      id: "2",
      x: 0,
      y: 5,
      w: 12,
      h: 3,
      children: [
        {
          id: "3",
          x: 1,
          y: 0,
          w: 9,
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
          w: 8,
          h: 1,
          data: {
            type: "map",
            title: "A map widget",
            data: "Chennai, Tamil Nadu, India",
          },
        },
      ],
    },
    {
      id: "5",
      x: 0,
      y: 2,
      w: 12,
      h: 3,
      children: [
        {
          id: "6",
          x: 1,
          y: 0,
          w: 9,
          h: 1,
          data: {
            type: "map",
            title: "A map widget",
            data: "Chennai, Tamil Nadu, India",
          },
        },
      ],
    },
    {
      id: "1",
      x: 0,
      y: 0,
      w: 12,
      h: 2,
      data: {
        type: "calendar",
        title: "A calendar widget",
        data: 1685811196713,
      },
    },
  ]);

  const getWidget = ({ type, data, id, gridId } = {}) => {
    if (type === "calendar") {
      return <CalendarWidget data={data} remove={() => remove(id, gridId)} />;
    } else if (type === "map") {
      return <MapWidget data={data} remove={() => remove(id, gridId)} />;
    }
  };

  const getItem = ({ item, gridId = "master" } = {}) => {
    const {
      data,
      data: { type },
      id,
    } = item ?? {};
    const widget = getWidget({ type, data, id, gridId });
    return (
      <GridstackItem
        className="gs-widget"
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
    <div className="row">
      <div className="flex-1">
        <GridstackContainer
          setLayout={setLayout}
          columns={12}
          rowHeight={100}
          accept={["gs-subgrid", "gs-widget"]}
          items={layout}
        >
          {layout.map((item) => {
            if ("children" in item) {
              // is a subgrid!
              const { children, id: gridId } = item;
              return (
                <GridstackItem
                  key={item.id}
                  id={item.id}
                  x={item.x}
                  y={item.y}
                  w={item.w}
                  h={item.h}
                  className="gs-subgrid"
                >
                  <GridstackSubgrid
                    accept={["gs-widget"]}
                    items={children ?? []}
                    key={gridId}
                    gridId={gridId}
                  >
                    {children.map((child) => {
                      return getItem({ item: child, gridId: gridId });
                    })}
                  </GridstackSubgrid>
                </GridstackItem>
              );
            } else {
              return getItem({ item });
            }
          })}
        </GridstackContainer>
      </div>
      <div className="flex-1">
        <JsonView data={layout} style={darkStyles} class="json-viewer" />
      </div>
    </div>
  );
}

export default Nested;
