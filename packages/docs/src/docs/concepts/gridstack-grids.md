---
outline: deep
---

# What are `Gridstack Grids`?

`Gridstack Grids` can hold `Gridstack Items`. These items can be resized and repositioned within the grid, either manually using mouse dragging or by `@declarative-gridstack's` APIs .

```json
[
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
];
```

The array given above represents a `Gridstack Grid` with two `Gridstack Items` in it.
