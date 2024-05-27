---
outline: deep
---

# What are Gridstack Subgrids?

Each subgrid is itself a Gridstack item that has a Gridstack container within it. This container can hold other Gridstack items, allowing for more complex and nested layouts.

```jsx
const [subgridLayout, setSubgridLayout] = useState([
  {
    id: 2,
    x: 3,
    y: 4,
    w: 6,
    h: 4,
    children: [
      {
        id: 3,
        x: 6,
        y: 0,
        w: 6,
        h: 3,
        data: {
          message: "My ID is 3",
        },
      },
      {
        id: 4,
        x: 0,
        y: 0,
        w: 6,
        h: 3,
        data: {
          ability: "I can be moved around!",
        },
      },
    ],
  },
]);
```

Based on the model provided above, the layout can be described as having a master container that includes a Gridstack item that serves as a subgrid. This subgrid, in turn, contains two additional Gridstack items.
