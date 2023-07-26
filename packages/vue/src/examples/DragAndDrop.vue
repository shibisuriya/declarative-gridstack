<template>
  <div>
    <div id="trash">I am a shredder! Drop some items on me, I am hungry!</div>
    <div class="row">
      <div class="drag-and-drop-container">
        <div v-for="item in dndItems" :key="item.id" class="dnd-item-container">
          <div class="gs-dnd-item grid-stack-item" :gs-dnd-item-id="item.id">
            <div class="grid-stack-item-content" style="padding: 5px">
              {{ item.data.title }}
            </div>
          </div>
        </div>
      </div>
      <gs-container
        class="grid"
        ref="gs-master-grid"
        :layout="layout"
        :accept="['gs-column']"
        :rowHeight="50"
        :min-row="2"
        :dnd="{
          class: 'gs-dnd-item',
          dndItems: dndItems,
          shredder: '#trash',
          options: { appendTo: 'body', helper: 'clone' },
          uidGenerator: uidGenerator,
        }"
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
          <widget-container :id="widget.id" :showCloseButton="false">
            <dummy-widget :data="widget"></dummy-widget>
          </widget-container>
        </gs-item>
      </gs-container>
      <div class="model">
        <vue-json-pretty :data="layout" />
      </div>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import WidgetContainer from "../components/WidgetContainer.vue";
import DummyWidget from "../components/Widget.vue";
import GridstackItem from "../gridstack/GridstackItem.vue";
import GridstackContainer from "../gridstack/GridstackContainer.vue";
import "vue-json-pretty/lib/styles.css";
export default {
  name: "SimpleExample",
  components: {
    "gs-item": GridstackItem,
    "gs-container": GridstackContainer,
    WidgetContainer,
    DummyWidget,
    VueJsonPretty,
  },
  methods: {
    uidGenerator() {
      return this.uid--;
    },
    saveLayout() {},
  },
  data() {
    return {
      uid: -1,
      dndItems: [
        {
          id: 1,
          data: {
            title: "Cow 1 ",
          },
        },
        {
          id: 2,
          data: {
            title: "Donkey 2",
          },
        },
        {
          id: 3,
          data: {
            title: "Milk",
          },
        },
        {
          id: 4,
          data: {
            title: "Horlicks",
          },
        },
        {
          id: 5,
          data: {
            title: "Coffee",
          },
        },
        {
          id: 6,
          data: {
            title: "Dog",
          },
        },
      ],
      layout: [
        {
          id: 3,
          x: 6,
          y: 0,
          w: 6,
          h: 3,
          data: "Hello from widget 3",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.dnd-item-container {
  border: 1px solid green;
  padding: 10px;
  margin: 5px;
}
.row {
  display: flex;
}
.grid {
  width: 65%;
}
.drag-and-drop-container {
  width: 20%;
  border: 1px solid black;
}
.model {
  width: 15%;
  padding-left: 20px;
}
#trash {
  border: 1px solid black;
  margin: 20px 0;
  color: white;
  font-size: 20px;
  padding: 50px;
  text-align: center;
  background-color: black;
}
</style>
