# A simple example

A `Gridstack container` with one `Gridstack item` in it.

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Simple from '../../../components/react/Simple.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Simple, {}, null))
})
</script>
