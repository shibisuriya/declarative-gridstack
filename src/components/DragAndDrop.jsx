import React, { Fragment, useEffect, useRef, useState } from "react";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import {
  GridstackContainer,
  GridstackItem,
  GridstackSubgrid,
} from "../gridstack";
import { MapWidget, CalendarWidget } from "./widgets";
import styles from "./styles.module.css";
import HtmlInput from "./HtmlInput";

function Dev() {
  // const savedLayout = JSON.parse(localStorage.getItem("layout"));
  const uid = useRef(-1);
  const [layout, setLayout] = useState([
    {
      id: "1",
      x: 0,
      y: 3,
      w: 2,
      h: 2,
      data: {
        type: "calendar",
        title: "A calendar widget",
        data: 1685811196713,
      },
    },
    {
      id: "2",
      x: 0,
      y: 0,
      w: 2,
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
      y: 0,
      w: 2,
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
        {
          id: "7",
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
  ]);
  const [gridstackContainerVisibility, setGridstackContainerVisibility] =
    useState(true);

  useEffect(() => {
    layoutChanged();
    return () => {
      // perform cleanup here if necessary
      console.log("Dev.jsx will unmount!");
    };
    // eslint-disable-next-line
  }, [layout]); // empty dependency array to ensure it only runs once

  // const widgetStyles = {
  //   border: "1px solid red",
  //   margin: "10px",
  // };

  const remove = (id, gridId) => {
    gridsRef.current[gridId].remove(id);
  };

  const getWidget = ({ type, data, id, gridId } = {}) => {
    if (dndItems.some((item) => item.data.type === type)) {
      return <HtmlInput data={data}></HtmlInput>;
    } else if (type === "calendar") {
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

  const layoutChanged = () => {
    // localStorage.setItem("layout", JSON.stringify(layout));
  };

  const showHideGridstackContainer = () => {
    setGridstackContainerVisibility((visibility) => !visibility);
  };

  const gridsRef = useRef([]);
  const createRef = (el, id) => {
    gridsRef.current[id] = el;
  };

  const [dndItems] = useState([
    {
      id: "1",
      data: {
        type: "button",
        value: "Click me!",
      },
    },
    {
      id: "2",
      data: {
        type: "checkbox",
        value: "true",
      },
    },
    {
      id: "3",
      data: {
        type: "date",
        value: "",
      },
    },
    {
      id: "4",
      data: {
        type: "email",
        value: "shibisuriya@gmail.com",
      },
    },
    {
      id: "5",
      data: {
        type: "color",
        value: "",
      },
    },
    {
      id: "6",
      data: {
        type: "number",
        value: "Click me!",
      },
    },
    {
      id: "7",
      data: {
        type: "password",
        value: "Click me!",
      },
    },
    {
      id: "8",
      data: {
        type: "radio",
        value: "Click me!",
      },
    },
    {
      id: "9",
      data: {
        type: "range",
        value: "Click me!",
      },
    },
  ]);

  const uidGenerator = () => {
    return uid.current--;
  };
  return (
    <Fragment>
      <div>
        <h1 className="center-text">Drag and droppables</h1>
        <div className={styles["dnd-container"]}>
          {dndItems.map((item) => {
            return (
              <div
                key={item.id}
                className="gs-dnd-item grid-stack-item"
                gs-dnd-item-id={item.id}
              >
                <div
                  className="grid-stack-item-content"
                  style={{ padding: "5px" }}
                >
                  <HtmlInput data={item.data} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Grid</h1>
        <div className={styles["container"]}>
          <div className={styles["gs-container"]}>
            {gridstackContainerVisibility && (
              <GridstackContainer
                ref={(el) => createRef(el, "master")}
                setLayout={setLayout}
                columns={4}
                rowHeight={100}
                layoutChanged={layoutChanged}
                accept={["gs-subgrid"]}
                dnd={{
                  class: "gs-dnd-item",
                  dndItems: dndItems,
                  shredder: "#trash",
                  options: { appendTo: "body", helper: "clone" },
                  uidGenerator: uidGenerator,
                }}
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
                          gridId={item.id}
                          items={children}
                          key={gridId}
                          ref={(el) => createRef(el, gridId)}
                          dnd={{
                            class: "gs-dnd-item",
                            dndItems: dndItems,
                            shredder: "#trash",
                            options: { appendTo: "body", helper: "clone" },
                            uidGenerator: uidGenerator,
                          }}
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
            )}
          </div>
          <div className={styles["controls-container"]}>
            <button onClick={showHideGridstackContainer}>
              Show / Hide Gridstack Container
            </button>
            <button onClick={() => console.log(layout)}>
              console.log(layout)
            </button>
            <button onClick={uidGenerator}>UID--</button>
          </div>
          <div className={styles["json-viewer"]}>
            <JsonView data={layout} style={darkStyles} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Dev;
