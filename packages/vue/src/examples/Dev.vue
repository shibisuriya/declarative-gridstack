<template>
  <div class="row">
    <div class="col-8">
      <div>
        <div class="new-gs-column grid-stack-item">
          <div class="grid-stack-item-content" style="padding: 5px">
            <div>
              <span>Drag me in the dashboard!</span>
            </div>
          </div>
        </div>
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
          v-for="column in layout"
          :key="column.id"
          class="gs-column"
          :id="column.id"
          :x="column.x"
          :y="column.y"
          :w="column.w"
          :h="column.h"
          :noResize="true"
          :noScroll="true"
        >
          <subgrid-container
            :id="column.id"
            :level="1"
            @remove="
              () => {
                remove({
                  gridId: 'gs-master-grid',
                  itemId: column.id,
                });
              }
            "
          >
            <gs-subgrid
              :items="column.children"
              :accept="['gs-section']"
              :ref="`gs-subgrid-${column.id}`"
              auto-scale="onResize"
              drag-in=".new-gs-section"
            >
              <gs-item
                v-for="section in column.children"
                :key="section.id"
                class="gs-section"
                :id="section.id"
                :x="section.x"
                :y="section.y"
                :w="section.w"
                :h="section.y"
                :noResize="true"
                :noScroll="true"
              >
                <subgrid-container
                  :id="section.id"
                  :level="2"
                  @remove="
                    () => {
                      remove({
                        gridId: column.id,
                        itemId: section.id,
                      });
                    }
                  "
                >
                  <gs-subgrid
                    :items="section.children"
                    :accept="['gs-widget']"
                    :ref="`gs-subgrid-${section.id}`"
                    auto-scale="onResize"
                  >
                    <gs-item
                      v-for="widget in section.children"
                      :key="widget.id"
                      class="gs-widget"
                      :id="widget.id"
                      :w="widget.w"
                      :h="widget.h"
                      :x="widget.x"
                      :y="widget.y"
                    >
                      <widget-container
                        :id="widget.id"
                        @remove="
                          () => {
                            remove({
                              itemId: widget.id,
                              gridId: section.id,
                            });
                          }
                        "
                      >
                        <dummy-widget :data="widget"></dummy-widget>
                      </widget-container>
                    </gs-item>
                  </gs-subgrid>
                </subgrid-container>
              </gs-item>
            </gs-subgrid>
          </subgrid-container>
        </gs-item>
      </gs-container>
    </div>
    <div class="col-4">
      <div>
        <button @click="clearStorage">Clear localStorage</button>
        <button @click="saveLayout">Save layout in browser storage</button>
        <button @click="addColumn">Add column</button>
        <div>
          <select></select>
          <button @click="addSection">Add section</button>
        </div>
      </div>
      <div>
        <vue-json-pretty :data="layout" />
      </div>
    </div>
  </div>
</template>
<script>
import DummyWidget from "../components/Widget.vue";
import GridstackItem from "../gridstack/GridstackItem.vue";
import GridstackContainer from "../gridstack/GridstackContainer.vue";
import GridstackSubgrid from "../gridstack/GridstackSubgrid.vue";
import SubgridContainer from "../components/SubgridContainer.vue";
import WidgetContainer from "../components/WidgetContainer.vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
export default {
  name: "DevComponent",
  components: {
    VueJsonPretty,
    SubgridContainer,
    DummyWidget,
    WidgetContainer,
    "gs-item": GridstackItem,
    "gs-container": GridstackContainer,
    "gs-subgrid": GridstackSubgrid,
  },
  methods: {
    clearStorage() {
      localStorage.setItem("layout", JSON.stringify([]));
    },
    remove(item) {
      const { itemId, gridId } = item;
      if (gridId == "gs-master-grid") {
        this.$refs["gs-master-grid"].removeItem(itemId);
      } else {
        const [subGrid] = this.$refs[`gs-subgrid-${gridId}`]; // This returns an array, so destructure it.
        subGrid.removeItem(itemId);
      }
    },
    addColumn() {
      this.layout.push({
        id: Date.now() * 1,
        x: 0,
        y: 0,
        w: 6,
        h: 9,
        children: [
          {
            id: Date.now() * 1 - 1,
            x: 3,
            y: 4,
            w: 6,
            h: 4,
            children: [
              {
                id: Date.now() * 1 - 2,
                x: 6,
                y: 0,
                w: 6,
                h: 3,
              },
              {
                id: Date.now() * 1 - 3,
                x: 0,
                y: 0,
                w: 6,
                h: 3,
              },
            ],
          },
          {
            id: Date.now() * 1 - 4,
            x: 3,
            y: 0,
            w: 6,
            h: 4,
            children: [
              {
                id: Date.now() * 1 - 5,
                x: 6,
                y: 0,
                w: 6,
                h: 3,
              },
              {
                id: Date.now() * 1 - 6,
                x: 0,
                y: 0,
                w: 6,
                h: 3,
              },
            ],
          },
          {
            id: Date.now() * 1 - 7,
            x: 3,
            y: 0,
            w: 6,
            h: 4,
            children: [
              {
                id: Date.now() * 1 - 8,
                x: 6,
                y: 0,
                w: 6,
                h: 3,
              },
              {
                id: Date.now() * 1 - 9,
                x: 0,
                y: 0,
                w: 6,
                h: 3,
              },
            ],
          },
        ],
      });
    },
    addSection(subGridId) {
      console.log(subGridId);
    },
    saveLayout() {
      localStorage.setItem("layout", JSON.stringify(this.layout));
    },
  },

  created() {
    const storedLayout = JSON.parse(localStorage.getItem("layout"));
    if (storedLayout?.length > 0) {
      this.layout = storedLayout;
    }
  },
  mounted() {
    console.log("App.vue mounted => ", this._uid);
  },
  data() {
    return {
      layout: [
        {
          id: 1,
          x: 0,
          y: 0,
          w: 6,
          h: 9,
          children: [
            {
              id: 2,
              x: 3,
              y: 4,
              w: 6,
              h: 4,
              children: [
                {
                  id: 3,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 4,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 5,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 6,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 7,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 8,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 9,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 10,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
          ],
        },
        {
          id: 11,
          x: 0,
          y: 0,
          w: 6,
          h: 9,
          children: [
            {
              id: 12,
              x: 3,
              y: 4,
              w: 6,
              h: 4,
              children: [
                {
                  id: 13,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 14,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 15,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 16,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 17,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
            {
              id: 18,
              x: 3,
              y: 0,
              w: 6,
              h: 4,
              children: [
                {
                  id: 19,
                  x: 6,
                  y: 0,
                  w: 6,
                  h: 3,
                },
                {
                  id: 20,
                  x: 0,
                  y: 0,
                  w: 6,
                  h: 3,
                },
              ],
            },
          ],
        },
      ],
      page: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}
.col-8 {
  width: 80%;
}
.col-4 {
  padding-left: 20px;
  width: 20%;
}
</style>

<style lang="scss">
:root {
  font-size: 16px;
}
</style>
