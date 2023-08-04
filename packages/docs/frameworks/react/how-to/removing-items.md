# Removing items from a grid

Don't remove the item from the layout json if you want to remove an item from the grid.
::: warning
Don't do this!
:::

```jsx
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

const remove = (id) => {
  setLayout((prevLayout) => prevLayout.filter((item) => item.id !== id));
}; // Don't remove the item from the json directly.
```

::: tip
Use this instead.
:::

```jsx
const gridRef = useRef();
const remove = (id) => {
  gridRef.current.remove(id); // Let the lib know that you want to remove an item from the layout.
};
return <GridstackContainer ref={gridRef}></GridstackContainer>;
```

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import {Remove} from '@declarative-gridstack/react/examples'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Remove, {}, null))
})
</script>
