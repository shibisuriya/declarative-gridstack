<template>
  <div class="row">
    <div class="grid">
      <div class="notes">
        When an Gridstack item present in a Gridstack container is repositioned,
        resized or removed, etc. the model is automatically updated. The model
        of a specifc Gridstack layout could then be saved to an HTTP API.
      </div>
      <gs-container
        ref="gs-master-grid"
        :layout="layout"
        :rowHeight="50"
        :min-row="2"
      >
        <gs-item
          v-for="widget in layout"
          :key="widget.id"
          :id="widget.id"
          :x="widget.x"
          :y="widget.y"
          :w="widget.w"
          :h="widget.h"
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
            <widget :data="widget.data"></widget>
          </widget-container>
        </gs-item>
      </gs-container>
    </div>
    <div class="state">
      <vue-json-pretty :data="layout" />
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import WidgetContainer from "../components/WidgetContainer.vue";
import Widget from "../components/Widget.vue";
import GridstackItem from "../gridstack/GridstackItem.vue";
import GridstackContainer from "../gridstack/GridstackContainer.vue";
import "vue-json-pretty/lib/styles.css";
export default {
  name: "SimpleExample",
  components: {
    "gs-item": GridstackItem,
    "gs-container": GridstackContainer,
    WidgetContainer,
    Widget,
    VueJsonPretty,
  },
  methods: {
    saveLayout() {},

    remove(item) {
      this.$refs["gs-master-grid"].removeItem(item.itemId);
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
          h: 4,
          data: {
            name: "Dummy",
            otherData: "I am dummy!",
          },
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
}
.grid {
  width: 50%;
}
.state {
  width: 50%;
  padding: 0 50px;
}
.notes {
  margin-bottom: 25px;
}
</style>
