---
outline: deep
---

# What are Gridstack Droppables?

## Drag and drop

### What are DND items?

DND (drag and drop) items are html elements (Gridstack Items that are not in a Gridstack Grid)
that could be dragged and dropped into a Gridstack Grid.

### How are DND items different from normal html elements?

DND items are normal html elements that have the class `grid-stack-item` in the outer tag and `grid-stack-item-content` in the inner tag. To ensure proper identification of the items in the DOM, each outer element should also have a unique class ('gs-dnd-item' in the example below) and a 'gs-dnd-item-id' attribute with a unique value. The example below shows two unique DND items:

```html
<div class="gs-dnd-item grid-stack-item" gs-dnd-item-id="-1">
  <div class="grid-stack-item-content" style="padding: 5px">
    I am vue gridstack DND item! With ID - 2
  </div>
</div>
<div class="gs-dnd-item grid-stack-item" gs-dnd-item-id="-2">
  <div class="grid-stack-item-content" style="padding: 5px">
    I am vue gridstack DND item! With ID - 2
  </div>
</div>
```

## Registering DND items with the Gridstack grid

Now that we have a couple of Gridstack DND items in the DOM, we need to register them with the Gridstack grid so that they can be accepted when a user drags and drops the DND item into the grid. To do that, follow these steps:

```jsx
const WidgetContainer = (props) => {
  const { children } = props;
  return (
    <div>
      <div>*** Widget Container ***</div>
      <div>{children}</div>
    </div>
  );
};

const Widget = (props) => {
  const { data } = props;
  return (
    <div>
      <h1>{data.title}</h1>
      <div>{data.ability}</div>
    </div>
  );
};

const Page = () => {
  const uid = useRef(-1);
  const uidGenerator = () => {
    return uid.current--; // Returns a unique number when called.
  };

  const [layout, setLayout] = useState([
    {
      id: 3,
      x: 6,
      y: 0,
      w: 6,
      h: 3,
      data: {
        title: "I am a Grid item",
        ability: "I can be moved around and resized.",
      },
    },
  ]);

  return (
    <GridstackContainer
      items={layout}
      setLayout={setLayout}
      // Register dnd items to the grid container.
      dnd={{
        class: "gs-dnd-item",
        dndItems: [
          { id: "-1", data: "I am vue gridstack DND item! With ID -1" },
          { id: "-2", data: "I am vue gridstack DND item! With ID -2" },
        ],
        uidGenerator: uidGenerator,
      }}
    >
      {layout.map((widget) => {
        return (
          <GridstackItem
            id={widget.id}
            x={widget.x}
            y={widget.y}
            w={widget.w}
            h={widget.h}
          >
            <WidgetContainer>
              <Widget data={widget}></Widget>
            </WidgetContainer>
          </GridstackItem>
        );
      })}
    </GridstackContainer>
  );
};
```

1. Specify the class used by the DND items ('gs-dnd-item' in our case).
2. Pass the DND items as an array.
3. Provide a unique ID generator callback function to the grid so that when a new item is dropped into the grid from outside, the new item gets a unique ID that is unique among all the gridItems present in the master and the sub-grids.

[Live example](https://shibisuriya.github.io/vue-gridstack/) of DND items. [Click here](https://github.com/shibisuriya/vue-gridstack/blob/master/src/examples/DragAndDrop.vue) to view code.
