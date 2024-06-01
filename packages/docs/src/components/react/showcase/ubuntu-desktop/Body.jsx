import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./body.module.css";
import {
  GridstackContainer,
  GridstackItem,
} from "@declarative-gridstack/react";

import Window from "./window/index.jsx";
import { APPS } from "./constants.js";

const Body = forwardRef((props, ref) => {
  const uid = useRef(-1);
  const getNewUid = () => {
    return uid.current--;
  };
  const [layout, setLayout] = useState([
    {
      id: "1",
      x: 0,
      y: 0,
      w: 3,
      h: 300,
      minH: 300,
      maxH: 557,
      minW: 3,
      maxW: 10,
      data: {
        type: APPS.VLC.id,
        title: "A calendar widget",
        data: "10/10/1990",
      },
    },
  ]);

  const getNewItem = (app) => {
    return {
      id: getNewUid(),
      x: 0,
      y: 0,
      w: 3,
      h: 300,
      minH: 300,
      maxH: 557,
      minW: 3,
      maxW: 10,
      data: {
        type: app,
        title: "A calendar widget",
        data: "10/10/1990",
      },
    };
  };

  const gridRef = useRef();

  const removeItem = (itemId) => {
    gridRef.current.remove(itemId);
  };

  const open = (app) => {
    setLayout((prev) => {
      return [...prev, getNewItem(app)];
    });
    console.log("shibi -> ", app);
  };

  useImperativeHandle(
    ref,
    () => {
      return { open };
    },
    []
  );

  console.log("shibi -> ", layout);

  return (
    <div className={styles.body}>
      <GridstackContainer
        ref={gridRef}
        items={layout}
        float={true}
        setLayout={setLayout}
        rowHeight="1"
      >
        {layout.map((widget) => {
          return (
            <GridstackItem
              key={widget.id}
              id={widget.id}
              x={widget.x}
              y={widget.y}
              w={widget.w}
              h={widget.h}
              minH={widget?.minH}
              maxH={widget?.maxH}
              minW={widget?.minW}
              maxW={widget?.maxW}
            >
              <Window onClose={() => removeItem(widget.id)}>
                {APPS[widget.data.type].component()}
              </Window>
            </GridstackItem>
          );
        })}
      </GridstackContainer>
    </div>
  );
});

export default Body;
