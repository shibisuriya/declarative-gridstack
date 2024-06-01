---
outline: deep
---

# What are Gridstack Subgrids?

Each subgrid is itself a [Gridstack item](./gridstack-items.md) that has a [Gridstack Grid](./gridstack-grids.md) within it, the grid can further hold other Gridstack items, allowing for more complex and nested layouts.

::: info
The root level Gridstack Grid is called the `Master Grid`.
:::

```json
[
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
];
```

The array given above represents a Master grid that has one Subgrid inside it, the subgrid further has 2 items inside it.

::: warning
The property `children` in an object that represents a Gridstack Item makes it a Gridstack Subgrid. The property `children` is a reserved property and must not be used for other purposes.
:::
