# Nested grids

Typical example of a nested grid layout. You can move items between the master grid and the subgrids.

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Nested from '../../../components/react/Nested.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Nested, {}, null))
})
</script>
