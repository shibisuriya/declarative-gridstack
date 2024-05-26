# Nested grid

Typical example of a nested grid. You can move items between the master grid and the subgrid.

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Nested from '../examples/nested/Nested.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Nested, {}, null))
})
</script>
