<template>
  <div>
    <div class="row header">
      <div class="title">Widget - {{ id }}</div>
      <button v-if="showCloseButton" @click="$emit('remove')">X</button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  min-height: 25px;
}
.title {
  font-weight: bold;
  font-size: 0.7rem;
  padding-left: 7px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
