# Nested grid

A nested grid example.

<div ref="el"></div>

<script setup>
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ref, onMounted } from 'vue'
import {Nested} from '@declarative-gridstack/react/examples'

const el = ref()
onMounted(() => {
  const root = createRoot(el.value)
  root.render(createElement(Nested, {}, null))
})
</script>
