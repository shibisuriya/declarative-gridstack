<template>
  <div>
    <div class="title">Row x Column</div>
    <div class="dimension-selector">
      <select @change="(e) => updateGridDimension(e.target.value)">
        <!-- Factors of 12 are 1, 2, 3, 4, 6, 12 -->
        <option value="3x3">3 x 3</option>
        <option value="4x3">4 x 3</option>
        <option value="6x2">6 x 2</option>
        <option value="12x1">12 x 1</option>
      </select>
    </div>

    <gs-container
      ref="gs-master-grid"
      :layout="layout"
      :accept="['gs-column']"
      :rowHeight="50"
      :min-row="2"
      drag-in="new-gs-column"
      @layoutChanged="saveLayout"
    >
      <gs-item
        v-for="widget in layout"
        :key="widget.id"
        class="gs-widget"
        :id="widget.id"
        :x="widget.x"
        :y="widget.y"
        :w="widget.w"
        :h="widget.h"
        :minW="widget.minW"
        :maxW="widget.maxW"
        :noScroll="true"
      >
        <widget-container
          :id="widget.id"
          @remove="
            () => {
              remove({
                itemId: widget.id,
                gridId: 'gs-master-grid',
              });
            }
          "
        >
          <dummy-widget :data="widget"></dummy-widget>
        </widget-container>
      </gs-item>
    </gs-container>
  </div>
</template>
<style lang="scss">
.dimension-selector {
  padding: 10px;
  margin: 0;
  select {
    display: block;
    margin: 0 auto;
    font-size: 20px;
  }
}
.title {
  text-align: center;
}
</style>

<script>
// @ is an alias to /src

import WidgetContainer from "../components/WidgetContainer.vue";
import DummyWidget from "../components/Widget.vue";
import GridstackItem from "../gridstack/GridstackItem.vue";
import GridstackContainer from "../gridstack/GridstackContainer.vue";
export default {
  name: "SimpleExample",
  components: {
    "gs-item": GridstackItem,
    "gs-container": GridstackContainer,
    WidgetContainer,
    DummyWidget,
  },
  methods: {
    updateGridDimension(dimension) {
      const [rows, columns] = dimension.split("x");
      rows;
      columns;
    },
    saveLayout() {},
  },
  data() {
    return {
      layout: [
        {
          id: 3,
          x: 0,
          y: 0,
          w: 4,
          h: 3,
          maxW: 6,
          minW: 2,
          data: { randomData: "Hello from widget 3" },
        },
        {
          id: 4,
          x: 0,
          y: 0,
          w: 4,
          h: 3,
          maxW: 6,
          minW: 2,
          data: { randomData: "Hello from widget 4" },
        },
      ],
    };
  },
};
</script>
