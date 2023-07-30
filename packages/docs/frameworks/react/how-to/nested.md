<div ref="el" />

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Nested from '../components/nested/Nested.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Nested, {}, null))
})
</script>
