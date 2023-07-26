<template>
  <div class="widget-body">
    <div class="widget-header">Widget name - {{ data.name }}</div>
    <div class="widget-content">Other data - {{ data.otherData }}</div>
    <div class="resize-arrow" v-if="data.showResizeArrows">
      <button @click="leftArrowClicked">{{ "<" }}</button>
      <button @click="rightArrowClicked">{{ ">" }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "DummyWidget",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    leftArrowClicked() {
      this.$emit("leftArrowClicked");
    },
    rightArrowClicked() {
      this.$emit("rightArrowClicked");
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-body {
  background-color: red;
  color: white;
}
.resize-arrow {
  position: absolute;
  top: 50%;
  right: 0px;
}
</style>
