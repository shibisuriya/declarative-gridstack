<template>
  <div>
    <div class="row header">
      <div class="title"> Level {{ level }} subgrid - {{ id }}</div>
      <button @click="() => $emit('remove')">X</button>
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

    level: { type: Number, required: true },
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding-left: 5px;
  font-weight: bold;
}
.row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
