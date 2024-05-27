# Adding items

To add an item to a grid, push the item direcly to the layout json.

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

const addItem = () => {
  setLayout((prevLayout) => [
    ...prevLayout,
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
};
```

Click the `Add item` button to add a new item to the layout.

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import AddingItem from '../examples/adding-item/AddingItem.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(AddingItem, {}, null))
})
</script>
