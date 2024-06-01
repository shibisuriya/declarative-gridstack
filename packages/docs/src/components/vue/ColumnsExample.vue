<template>
  <div>
    Change the number of columns after the grid has been initialized!
    <div class="columns-selector">
      <h2>Number of columns</h2>
      <select v-model="numberOfColumns" @change="changeNumberOfColumns">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
    </div>
    <gs-container
      ref="gs-master-grid"
      :layout="layout"
      :columns="numberOfColumns"
      :single-column-mode="true"
      :single-column-mode-min-w="600"
      :accept="['gs-column']"
      rowHeight="auto"
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
          <dummy-widget :data="widget.data"></dummy-widget>
        </widget-container>
      </gs-item>
    </gs-container>
  </div>
</template>

<script>
// @ is an alias to /src

import WidgetContainer from "../components/WidgetContainer.vue";
import DummyWidget from "../components/Widget.vue";
import {GridstackItem, GridstackContainer} from "@declarative-gridstack/vue";
export default {
  name: "SimpleExample",
  components: {
    "gs-item": GridstackItem,
    "gs-container": GridstackContainer,
    WidgetContainer,
    DummyWidget,
  },
  methods: {
    changeNumberOfColumns() {
      // Supported modes, 'moveScale' | 'move' | 'scale' | 'none'
      this.$refs["gs-master-grid"].updateNumberOfColumns(
        Number(this.numberOfColumns),
        "moveScale"
      );
    },
    saveLayout() {},
  },
  data() {
    return {
      numberOfColumns: 3,
      layout: [
        {
          id: 4,
          x: 6,
          y: 0,
          w: 6,
          h: 3,
          data: { randomData: "Hello from widget 4" },
        },
        {
          id: 3,
          x: 6,
          y: 0,
          w: 6,
          h: 3,
          data: { randomData: "Hello from widget 3" },
        },
        {
          id: 2,
          x: 6,
          y: 0,
          w: 6,
          h: 2,
          data: { randomData: "Hello from widget 2" },
        },
        {
          id: 1,
          x: 0,
          y: 0,
          w: 6,
          h: 3,
          data: { randomData: "Hello from widget 1" },
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.columns-selector {
  padding: 10px;
  margin-bottom: 10px;
  select {
    display: block;
    margin: 0 auto;
    font-size: 25px;
  }
  h2 {
    text-align: center;
  }
}
</style>
