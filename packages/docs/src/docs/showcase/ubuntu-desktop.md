---
layout: page
---

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import Simple from '../../components/react/showcase/ubuntu-desktop/index.jsx'
// import Simple from '../../components/react/Simple.jsx'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Simple, {}, null))
})
</script>
