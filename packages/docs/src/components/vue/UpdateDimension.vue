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
        <dummy-widget
          :data="widget.data"
          @leftArrowClicked="
            () => leftArrowClicked({ id: widget.id, w: widget.w, x: widget.x })
          "
          @rightArrowClicked="
            () => rightArrowClicked({ id: widget.id, w: widget.w, x: widget.x })
          "
        ></dummy-widget>
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
const MAX_GRID_COLUMNS = 12;
export default {
  name: "UpdateDimensions",
  components: {
    "gs-item": GridstackItem,
    "gs-container": GridstackContainer,
    WidgetContainer,
    DummyWidget,
  },
  methods: {
    saveLayout() {},
    leftArrowClicked(item) {
      const { w, x } = item ?? {};
      if (w > 1) {
        if (x > 0) {
          Object.assign(item, { w: w - 1 });
          this.$refs["gs-master-grid"].updateItem(item);
        } else {
          throw new Error("Can't move further to the left!");
        }
      } else {
        throw new Error(
          "Width of a grid item should be more than or equal to 1!"
        );
      }
    },
    rightArrowClicked(item) {
      const { w, x } = item ?? {};
      if (w < MAX_GRID_COLUMNS) {
        if (w + x < MAX_GRID_COLUMNS) {
          Object.assign(item, { w: w + 1 });
          this.$refs["gs-master-grid"].updateItem(item);
        } else {
          throw new Error("Can't move futher to the right!");
        }
      } else {
        throw new Error(
          `Width of a grid item should be less than ${MAX_GRID_COLUMNS}`
        );
      }
    },
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
          data: {
            title: "Hello from widget 3",
            showResizeArrows: true,
          },
        },
        {
          id: 4,
          x: 0,
          y: 0,
          w: 6,
          h: 3,
          data: {
            title: "Hello from widget 4",
            showResizeArrows: true,
          },
        },
      ],
    };
  },
};
</script>
