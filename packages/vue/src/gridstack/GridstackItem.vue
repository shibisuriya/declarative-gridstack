<template>
  <div
    v-if="loaded"
    class="grid-stack-item"
    :gs-x="config.x"
    :gs-y="config.y"
    :gs-w="config.w"
    :gs-h="config.h"
    :gs-id="config.id"
    :gs-no-resize="config.noResize"
    :gs-min-w="config.minW"
    :gs-max-w="config.maxW"
  >
    <div
      class="grid-stack-item-content"
      :style="{
        overflowY: noScroll ? 'hidden' : 'auto',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
export default {
  name: "GridstackItem",
  props: {
    item: {
      type: Object,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    minW: {
      type: Number,
      default: 1,
    },
    maxW: {
      type: Number,
      default: 12, // Hard code for now.
    },
    noResize: {
      type: Boolean,
      default: false,
    },
    noScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
      dimension: {},
    };
  },
  created() {
    // Make a copy of the props given, and supply it to gridstack in the template...
    // gridstack tends to change the input supplied...
    this.config = cloneDeep({
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      id: this.id,
      noResize: this.noResize,
      minW: this.minW,
      maxW: this.maxW,
      minH: this.minH,
      maxH: this.maxH
    });
    console.log("GridItem created, _uid = ", this._uid);
    this.$nextTick(() => {
      // makeWidget should be called after the template has been loaded...
      this.loaded = true;
      this.$nextTick(() => {
        const masterGrid = this.$parent?.masterGrid;
        const subGrid = this.$parent?.subGrid;
        if (subGrid) {
          // This subgrid exists inside of another subgird.
          subGrid.makeWidget(this.$el);
        } else if (masterGrid) {
          // This subgrid exists inside of the master grid.
          masterGrid.makeWidget(this.$el);
        } else {
          throw new Error("Unable to find Gridstack object!");
        }
      });
    });
  },
  mounted() {
    // console.log("GridItem mounted, _uid = ", this._uid);
    // this.$nextTick(() => {
    //   this.loaded = true;
    //   this.$nextTick(() => {
    //     this.getGridstack().makeWidget(this.$el);
    //   });
    // });
  },
  computed: {
    defaultSlot() {
      return this.$slots?.default;
    },
  },
};
</script>

<style lang="scss">
.grid-stack-item {
  border: 1px solid yellow;
}
.grid-stack-item-content {
  border: 1px solid red;
}
</style>
