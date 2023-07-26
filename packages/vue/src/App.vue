<template>
  <div id="app">
    <nav class="top-nav">
      <router-link to="/examples/simple">Simple</router-link>
      <router-link to="/examples/nested">Nested</router-link>
      <router-link to="/examples/state-syncing">State syncing</router-link>
      <router-link to="/examples/drag-and-drop">Drag and Drop</router-link>
      <router-link to="/examples/drag-and-drop">Drag and Drop</router-link>
      <router-link to="/examples/update-dimensions"
        >Update dimensions using code</router-link
      >
      <router-link to="/examples/columns">Columns</router-link>
      <router-link to="/examples/min-and-max">Minimum and Maximum</router-link>
    </nav>
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
.top-nav {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-evenly;
}
</style>
