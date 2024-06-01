# Vue Gridstack (WIP)

gridstack.js as Vue components.

# Core concepts

## What are Gridstack containers?

Gridstack containers can hold Gridstack items, these items can be resized and repositioned.

```vue
<script>
export default {
  data() {
    layout: [
      {
        id: 3,
        x: 6,
        y: 0,
        w: 6,
        h: 3,
        data: "My id is 3!",
      },
      {
        id: 4,
        x: 0,
        y: 0,
        w: 6,
        h: 3,
        data: "My id is 4!",
      },
    ];
  },
};
</script>
```

The array mentioned above is a model for a master grid that contains two Gridstack items.

## What are gridstack items?

A Gridstack item is an object that must contain these properties.

- id: A unique identifier for the item.
- x: The x-coordinate of the item's position within the container.
- y: The y-coordinate of the item's position within the container.
- w: The width of the item, specified in terms of the number of grid columns it occupies.
- h: The height of the item, specified in terms of the number of grid rows it occupies.

These properties are necessary for an item to be correctly positioned and sized within a Gridstack container.

Arbitary properties,

- data (can be named arbitrarily and should be a valid JavaScript identifier): configuration information or other relevant details that the widget component requires in order to determine how it should look and function. This property will be passed to the widget component as props.

The master Gridstack container and the Gridstack subgrids both have the capability to hold Gridstack items.

```vue
<script>
export default {
  data() {
    return {
      widget: {
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
    };
  },
};
</script>
```

The object given above is a model for a Gridstack item.

## What are Gridstack subgrids?

Each subgrid is itself a Gridstack item that has a Gridstack container within it. This container can hold other Gridstack items, allowing for more complex and nested layouts.

```vue
<script>
export default {
  data() {
    return {
      layout: [
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
      ],
    };
  },
};
</script>
```

Based on the model provided above, the layout can be described as having a master container that includes a Gridstack item that serves as a subgrid. This subgrid, in turn, contains two additional Gridstack items.

# How it works?

When an Gridstack item present in a Gridstack container is repositioned, resized or removed, etc. the model is automatically updated.

```vue
<script>
export default {
  data() {
    return {
      layout: [
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
      ],
    };
  },
  computed: {
    widget() {
      const [widget] = this.layout ?? []; // The first item in the layout array.
      return widget;
    },
  },
};
</script>
<template>
  <gs-container :layout="layout">
    <gs-item
      :id="widget.id"
      :x="widget.x"
      :y="widget.y"
      :w="widget.w"
      :h="widget.h"
    >
      <widget :data="widget.data"></widget>
    </gs-item>
  </gs-container>
</template>
```

The code snippet shows a simple Gridstack container containing a single item. If the user resizes the item by dragging its resize handle, the library automatically updates the item's size information in the model.

The updated model might look something like this...

```vue
<script>
export default {
  data() {
    return {
      widget: {
        id: 3,
        x: 6,
        y: 0,
        w: 10, // Width is increased.
        h: 10, // Height is increased.
        data: {
          title: "I am a Grid item",
          ability: "I can be moved around and resized.",
        },
      },
    };
  },
};
</script>
```

A [live example](https://shibisuriya.github.io/vue-gridstack/) would help to clarify this concept more effectively.

The model of a specifc Gridstack layout could then be saved to an HTTP API.

```js
axios.post("/save-layout", this.layout).then(() => {});
```

The saved model could then be retrieved from an HTTP API... To construct the layout again.

```js
axios.get("/get-layout").then(({ data }) => {
  this.layout = data;
});
```

[Click here](https://github.com/shibisuriya/vue-gridstack/blob/master/src/examples/StateSyncing.vue) to view code.

## Drag and drop

### What are DND items?

DND (drag and drop) items are html elements (gridstack items that resides out of
a gridstack grid) that could be dragged and dropped into a gridstack grid.

### How are DND items different from normal html elements?

DND items are normal html elements that have the class 'grid-stack-item' in the outer tag and 'grid-stack-item-content' in the inner tag. To ensure proper identification of the items in the DOM, each outer element should also have a unique class ('gs-dnd-item' in the example below) and a 'gs-dnd-item-id' attribute with a unique value. The example below shows two unique DND items:

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

```vue
<template>
  <gs-container
    :dnd="{
      class: 'gs-dnd-item',
      dndItems: [
        { id: '-1', data: 'I am vue gridstack DND item! With ID -1' },
        { id: '-2', data: 'I am vue gridstack DND item! With ID -2' },
      ],
      uidGenerator: uidGenerator,
    }"
  >
    <gs-item
      :id="widget.id"
      :x="widget.x"
      :y="widget.y"
      :w="widget.w"
      :h="widget.h"
    >
      <widget-container>
        <widget :data="widget"></widget>
      </widget-container>
    </gs-item>
  </gs-container>
  <script>
    export default {
      data() {
        return {
          uid: -1,
        };
      },
      methods: {
        uidGenerator() {
          // Returns a unique number when called.
          return uid--;
        },
      },
    };
  </script>
</template>
```

1. Specify the class used by the DND items ('gs-dnd-item' in our case).
2. Pass the DND items as an array.
3. Provide a unique ID generator callback function to the grid so that when a new item is dropped into the grid from outside, the new item gets a unique ID that is unique among all the gridItems present in the master and the sub-grids.

[Live example](https://shibisuriya.github.io/vue-gridstack/) of DND items. [Click here](https://github.com/shibisuriya/vue-gridstack/blob/master/src/examples/DragAndDrop.vue) to view code.
