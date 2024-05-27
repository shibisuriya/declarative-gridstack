# How it works?

When an Gridstack item present in a Gridstack container is repositioned, resized or removed, etc. the model is automatically updated.

```jsx
import {
  GridstackItem,
  GridstackContainer,
  GridstackSubgrid,
} from "@declarative-gridstack/react";

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

  const [widget] = layout ?? [];

  return (
    <GridstackContainer items={layout} setLayout={setLayout}>
      <GridstackItem
        id={widget.id}
        x={widget.x}
        y={widget.y}
        w={widget.w}
        h={widget.h}
      >
        <Widget data={widget.data}></Widget>
      </GridstackItem>
    </GridstackContainer>
  );
};
```

The code snippet shows a simple Gridstack container containing a single item. If the user resizes the item by dragging its resize handle (or by using @declarative-gridstack's APIs), the library automatically updates the item's size information in the model.

Try resizing / moving the grid item below to observe the model update automatically.

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Simple from '../guides/react/examples/simple/Simple.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Simple, {}, null))
})
</script>
