# Using the APIs

The lib only supports one way binding so it is not recommended to update the json and expect the lib to
update the layout ones the layout has been initialized and rendered, to learn more click [here](../../concepts/one-way-binding.md)

Instead of updating the json invoke the APIs supplied by the lib to perform actions such as, changing the widget's dimensions,
updating number of columns in a grid, etc.

## Updating a widget's dimensions after it has been initialized.

Use the `update` API provided to update the dimensions of a widget.

::: warning
Don't change the layout json to update a widget's dimension.
:::

Press the `Update width` button and see the layout change.

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import UpdatingDimensions from '../../../components/react/UpdatingDimensions.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(UpdatingDimensions, {}, null))
})
</script>

## Removing items from the grid

Use the `remove()` API provided to remove items from a grid.
::: warning
Don't remove the item from the layout json.
:::
To learn more about removing items from a grid click [here](./removing-items.md)

## Adding items to the grid

You can push an item directly to the layout json while adding a item, to learn more click [here](../react/adding-items.md)

To see a comprehensive list of APIs exposed by each component click here.
