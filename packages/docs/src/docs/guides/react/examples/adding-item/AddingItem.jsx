import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  GridstackContainer,
  GridstackItem,
} from "@declarative-gridstack/react";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import { Widget } from "../components/Widget";

import "./styles.css";

function AddingItems() {
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
  ]);

  const id = useRef(-1);

  const getNewId = () => {
    return id.current--;
  };

  const createNewItem = () => {
    const newId = String(getNewId());
    return {
      id: newId,
      x: 0,
      y: 0,
      w: 12,
      h: 2,
      data: {
        type: "calendar",
        title: "A calendar widget",
        data: "10/10/1990",
      },
    };
  };

  const addItem = () => {
    const newItem = createNewItem();
    setLayout((prevLayout) => {
      return [...prevLayout, newItem];
    });
  };

  return (
    <Fragment>
      <div>
        <button onClick={addItem}>Add item</button>
      </div>
      <div className="row">
        <div className="flex-1">
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
        <div className="flex-2">
          <JsonView data={layout} style={darkStyles} class="json-viewer" />
        </div>
      </div>
    </Fragment>
  );
}

export default AddingItems;
