import React, { Fragment, useRef, useState } from "react";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import {
  GridstackContainer,
  GridstackItem,
  GridstackSubgrid,
} from "@declarative-gridstack/react";
import HtmlInput from "../components/HtmlInput";
import { Widget } from "../components/Widget";

const MapWidget = (props) => {
  return <Widget {...props} />;
};

const CalendarWidget = (props) => {
  return <Widget {...props} />;
};

import "./styles.css";

function DragAndDrop() {
  const uid = useRef(-1);
  const [layout, setLayout] = useState([
    {
      id: "1",
      x: 0,
      y: 6,
      w: 9,
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
      y: 3,
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
      y: 0,
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
    localStorage.setItem("layout", JSON.stringify(layout));
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
      <div className="title">
        <div>
          <h1>Drag and drop</h1>
          <p>
            Drag and drop the droppables into the grid container or drop a grid
            item into the trash
          </p>
        </div>
      </div>
      <div>
        <h1>Trash</h1>
        <div
          id="trash"
          style={{
            width: "100%",
            height: "100px",
            border: "1px solid black",
            margin: "10px",
          }}
        ></div>
      </div>
      <div>
        <h1 className="center-text">Droppables</h1>
        <div className="grid">
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

      <div className="row">
        <div className="flex-1">
          <GridstackContainer
            ref={(el) => createRef(el, "master")}
            setLayout={setLayout}
            items={layout}
            columns={12}
            rowHeight={100}
            layoutChanged={layoutChanged}
            accept={["gs-subgrid", "gs-widget"]}
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
        </div>
        <div className="flex-1">
          <JsonView data={layout} style={darkStyles} />
        </div>
      </div>
    </Fragment>
  );
}

export default DragAndDrop;
