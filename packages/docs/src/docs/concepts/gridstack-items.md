---
outline: deep
---

# What are Gridstack Items?

A Gridstack item is an object that must contain these properties.

- id: A unique identifier for the item.
- x: The x-coordinate of the item's position within the grid.
- y: The y-coordinate of the item's position within the grid.
- w: The width of the item, specified in terms of the number of grid columns it occupies.
- h: The height of the item, specified in terms of the number of grid rows it occupies.

These properties are necessary for an item to be correctly positioned and sized within a Gridstack Grid.

Arbitary properties,

- data (can be named arbitrarily and should be a valid JavaScript identifier): configuration information or other relevant details that the widget component requires in order to determine how it should look and function. This property will be passed to the widget component as props.

The master [Gridstack Grid](./gridstack-grids.md) and the [Gridstack subgrids](./gridstack-subgrids.md) both have the capability to hold Gridstack items.

```json
{
  "widget": {
    "id": 3,
    "x": 6,
    "y": 0,
    "w": 6,
    "h": 3,
    "data": {
      "title": "I am a Grid item",
      "ability": "I can be moved around and resized."
    }
  }
}
```

The object given above is represents a Gridstack item.
