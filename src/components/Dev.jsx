import React, { useEffect, useState } from "react";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import {
  GridstackContainer,
  GridstackItem,
  GridstackSubgrid,
} from "../gridstack";
import { MapWidget, CalendarWidget } from "./widgets";
import styles from "./styles.module.css";

function Dev() {
  const savedLayout = JSON.parse(localStorage.getItem("layout"));
  const [layout, setLayout] = useState(
    savedLayout ?? [
      {
        id: "1",
        x: 1,
        y: 1,
        w: 2,
        h: 2,
        data: {
          type: "calendar",
          title: "A calendar widget",
          data: Date.now(),
        },
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
    ]
  );
  const [gridstackContainerVisibility, setGridstackContainerVisibility] =
    useState(true);

  useEffect(() => {
    layoutChanged();
    return () => {
      // perform cleanup here if necessary
      console.log("Dev.jsx will unmount!");
    };
  }, [layout]); // empty dependency array to ensure it only runs once

  // const widgetStyles = {
  //   border: "1px solid red",
  //   margin: "10px",
  // };

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

  const layoutChanged = () => {
    localStorage.setItem("layout", JSON.stringify(layout));
  };

  const showHideGridstackContainer = () => {
    setGridstackContainerVisibility((visibility) => !visibility);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["gs-container"]}>
        {gridstackContainerVisibility && (
          <GridstackContainer
            setLayout={setLayout}
            columns={2}
            rowHeight={100}
            layoutChanged={layoutChanged}
          >
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
        )}
      </div>
      <div className={styles["controls-container"]}>
        <button onClick={showHideGridstackContainer}>
          Show / Hide Gridstack Container
        </button>
        <button onClick={() => console.log(layout)}>console.log(layout)</button>
      </div>
      <div className={styles["json-viewer"]}>
        <JsonView data={layout} style={darkStyles} />
      </div>
    </div>
  );
}
export default Dev;
