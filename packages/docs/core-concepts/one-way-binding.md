# One way binding

If a user changes the layout by interacting with it the json will be automatically
synced, but if you want to change the layout using code, then don't update the json use declarative-gridstack's APIs.

The purpose of this lib is to convert a json representing a layout into a layout in the screen.
Once the layout has been rendered using a layout json, don't update the json and expect the layout
to change.

::: danger
Updating the layout json after the layout has been rendered might corrupt the json.
:::

```jsx
const [layout, setLayout] = useState([
  {
    id: "3",
    x: 1,
    y: 0,
    w: 9,
    h: 1,
    data: {
      type: "weather",
      title: "A weather widget",
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
]);
```

If you want to change the width of the item with id "4" then,

::: warning
Don't do the following.
:::

```jsx
setLayout((prevLayout) => {
  return prevLayout.map((item) => {
    if (item.id == "4") {
      return {
        ...item,
        w: 10,
      };
    }
    return item;
  });
});
```

The correct method of updating a widget's dimension is using declarative-gridstack's APIs.

```jsx
const Layout = () => {
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
  const container = useRef();

  const updateDimension = () => {
    container.update("4", {
      w: 10,
    });
  };

  return (
    <GridstackContainer items={layout} setLayout={setLayout} ref={container}>
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
  );
};
```

Read more about this behavior [here](../frameworks//react/how-to/using-apis.md).
