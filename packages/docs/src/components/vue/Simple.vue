<template>
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
</template>

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
    saveLayout() {},
  },
  data() {
    return {
      layout: [
        {
          id: 3,
          x: 6,
          y: 0,
          w: 6,
          h: 3,
          data: "Hello from widget 3",
        },
        {
          id: 4,
          x: 0,
          y: 0,
          w: 6,
          h: 3,
          data: "Hello from widget 4",
        },
      ],
    };
  },
};
</script>
