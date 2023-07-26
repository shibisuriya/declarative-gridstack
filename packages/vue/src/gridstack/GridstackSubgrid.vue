<template>
  <div v-if="loaded" class="grid-stack" ref="subgrid"><slot></slot></div>
</template>
<script>
import { GridStack } from "gridstack";
export default {
  inject: {
    getMasterGridOptions: { type: Function },
    saveLayout: { type: Function },
    getStoredItem: { type: Function },
    storeItem: { type: Function },
  },
  data() {
    return {
      subGrid: null,
      loaded: false,
    };
  },
  props: {
    dragIn: {
      type: String,
    },
    items: {
      type: Array,
      required: true,
    },
    accept: {
      type: Array,
      default: () => [],
    },
    autoScale: {
      type: String,
      default: "none",
      validator: (value) => {
        return ["onResize", "onRelease", "none"].includes(value);
      },
    },
  },
  computed: {
    defaultSlot() {
      return this.$slots?.default;
    },
    layoutHash() {
      const layoutHash = this.items.reduce((hashMap, item) => {
        hashMap[item.id] = item;
        return hashMap;
      }, {});
      return layoutHash;
    },
  },
  created() {
    const self = this;
    this.$nextTick(() => {
      self.loaded = true;
      self.$nextTick(() => {
        self.subGrid = GridStack.addGrid(self.$el, {
          ...self.getMasterGridOptions(),
          dragIn: self.dragIn,
          dragInOptions: { appendTo: "body", helper: "clone" },
          acceptWidgets: (el) => {
            const classList = new Set(el.classList);
            for (let i = 0; i < self.accept.length; i++) {
              const accept = self.accept[i];
              if (classList.has(accept)) {
                return true;
              }
            }
            return false;
          },
        });
        self.attachEventListeners();
      });
    });
  },
  methods: {
    removeItemFromModel(id) {
      const index = this.items.findIndex((item) => item.id == id);
      if (index >= 0) {
        // 'splice' is a mutating method, yes, I am mutating a prop.
        // eslint-disable-next-line vue/no-mutating-props
        const [removedItem] = this.items.splice(index, 1);
        this.storeItem(removedItem);
      } else {
        throw new Error(
          `Error while removing an item from the grid layout.
           The widget with id '${id} doesn't exist in grid layout.`
        );
      }
    },
    getItemElementUsingId(id) {
      return this.$el.querySelector(`.grid-stack-item[gs-id="${id}"]`);
    },
    removeItem(id) {
      // Removes item from the 'view'.
      console.log("item to be removed -> ", id);
      const item = this.getItemElementUsingId(id);
      this.subGrid.removeWidget(item, false); // RemoveDOM = false, don't remove DOM.
    },
    attachEventListeners() {
      const self = this;
      this.subGrid.on("added change", (event, items) => {
        // console.log("subgrid, added / changed => ", items);
        for (const item of items) {
          const { x, y, w, h, id } = item;
          if (self.layoutHash[id]) {
            Object.assign(self.layoutHash[id], { x, y, w, h });
          } else {
            if (event.type == "added") {
              // A new item has been added to the grid...
              const storedItem = self.getStoredItem();
              if (id == storedItem.id) {
                // An item was moved into this grid from some other grid...
                Object.assign(storedItem, { x, y, w, h }); // Update item's position and dimension.
                // eslint-disable-next-line vue/no-mutating-props
                self.items.push(storedItem);
              }
            } else {
              throw new Error(
                `We are attempting to apply the '${event.type}' event to a widget that
               does not exist in this grid layout.`
              );
            }
          }
        }
        self.scale(self.getMaxHeight());
      });
      this.subGrid.on("removed", (event, items) => {
        for (const item of items) {
          this.removeItemFromModel(item.id);
        }
        this.scale(this.getMaxHeight());
      });
      if (this.autoScale == "onResize") {
        this.subGrid.on("resize drag", (event, el) => {
          // In case of 'resize' and 'drag' we won't get an object with
          // the dimension and position instead we will get an html element, lame.
          // We have to manually extract dimension and position from that html element.
          const id = el.getAttribute("gs-id");
          const h = el.getAttribute("gs-h");
          const y = el.getAttribute("gs-y");
          const maxHeight = Object.keys(this.layoutHash).reduce((max, key) => {
            const getHeight = () => {
              if (key == id) {
                return Number(y) + Number(h);
              } else {
                const item = this.layoutHash[key];
                return Number(item.h) + Number(item.y);
              }
            };
            const height = getHeight();
            return height > max ? height : max;
          }, 0);
          this.scale(maxHeight);
        });
      }
    },
    getMaxHeight() {
      return this.items.reduce((max, item) => {
        const height = item.h + item.y;
        return height > max ? height : max;
      }, 0);
    },
    scale(height) {
      console.log("height -> ", height, "element -> ", this.$el);
      if (self.autoScale != "none") {
        if (height > 0 && Number.isInteger(height)) {
          const { subGrid, masterGrid } = this.$parent.$parent.$parent;
          const el = this.$parent.$parent.$el;
          if (subGrid) {
            // This subgrid is inside of another subgrid...
            subGrid.update(el, { h: height + 1 });
          } else if (masterGrid) {
            // This subgrid is inside of the master grid.
            masterGrid.update(el, { h: height + 1 });
          }
        } else {
          console.warn(
            `Unable to scale, the height supplied (${height}) should be a positive integer.`
          );
        }
      }
      this.saveLayout();
    },
  },
};
</script>

<style lang="scss" scoped></style>
