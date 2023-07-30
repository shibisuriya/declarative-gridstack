---
outline: deep
---

# What are Gridstack Containers?

Gridstack containers can hold Gridstack items. These items can be resized and repositioned either using @declarative-gridstack's API or manually using mouse dragging.

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

The array mentioned above is a model for a master grid that contains two Gridstack items.
