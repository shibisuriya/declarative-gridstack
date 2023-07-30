# One way binding

Once the initial model is used to construct the layout is then useless.
Which means changing the model won't change the layout... But when the user makes changes to the layout
by interacting with the layout by mouse the layout is automatically update... This is the concept of
one way binding. If you want to change the layout programmatically then use @declarative/gridstack's APIs don't change the model directly...

This is a model for a Gridstack container with two items in it.

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

If you want to change the width of the item with id "4" then don't do the following.

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

Doing this is not recommanded... This might introduce inconsistency in states.

The correct method of doing this is

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

Update the items like this instead using @declarative-gridstack's APIs.
