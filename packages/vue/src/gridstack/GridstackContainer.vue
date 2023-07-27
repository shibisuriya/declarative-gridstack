<template>
  <div class="grid-stack"><slot></slot></div>
</template>
<script>
import { GridStack } from "@declarative-gridstack/core";
import { cloneDeep, isEmpty } from "lodash";
import "@declarative-gridstack/core/dist/gridstack-extra.min.css";
import "@declarative-gridstack/core/dist/gridstack.min.css";
export default {
  name: "GridstackLayout",
  data() {
    return {
      masterGrid: null,
      storedItem: null,
    };
  },
  props: {
    margin: {
      type: [String, Number],
      default: 10,
    },
    columns: {
      type: [String, Number],
      default: 12,
      validator: (value) => Number(value) >= 1 && Number(value) <= 12, // Handles max. 12 columns for now.
    },
    dnd: {
      type: Object,
      validator: (obj) =>
        obj?.class &&
        typeof obj.class === "string" &&
        "uidGenerator" in obj &&
        typeof obj.uidGenerator === "function",
    },
    minRow: {
      type: Number,
      validator: (value) => value >= 0 && Number.isInteger(value),
      default: 0,
    },
    layout: {
      type: Array,
      required: true,
    },
    accept: {
      type: Array,
      default: () => [],
    },
    rowHeight: {
      type: [Number, String], // 'auto' | 'initial'
      default: 10, // '10px', 1 row size..
    },
    singleColumnMode: {
      type: Boolean,
      default: false,
    },
    singleColumnModeMinW: {
      type: Number,
      default: 100, // 100px
    },
  },
  provide() {
    return {
      saveLayout: this.saveLayout,
      getMasterGridOptions: () => cloneDeep(this.gridOptions),
      storeItem: (item) => {
        if (isEmpty(this.storedItem)) {
          this.storedItem = cloneDeep(item);
          this.$nextTick(() => {
            this.storedItem = null;
          });
        } else {
          throw new Error(
            `Unable to store item '${item.id}', since the store is already occupied by the item ${this.storedItem}.`
          );
        }
      },
      getStoredItem: () => cloneDeep(this.storedItem),
    };
  },
  created() {
    console.log("Gridstacklayout created = ", this._uid);
    const self = this;
    this.$nextTick(() => {
      // init() should be executed after the template has been loaded...
      const getDndOptions = () => {
        const { options, shredder } = self.dnd ?? {};
        if (self.dnd?.class) {
          const dnd = {
            dragIn: self.dnd.class,
          };
          if (options) {
            dnd["dragInOptions"] = options;
          }
          if (shredder) {
            dnd["removable"] = shredder;
          }
          return dnd;
        } else {
          return {};
        }
      };
      self.masterGrid = GridStack.init(
        {
          ...self.gridOptions,
          ...getDndOptions(),
          acceptWidgets: (el) => {
            const classList = new Set(el.classList);
            for (let i = 0; i < self.accept.length; i++) {
              const accept = self.accept[i];
              if (
                classList.has(accept) ||
                classList.has(self.dnd?.class ?? "")
              ) {
                return true;
              }
            }
            return false;
          },
        },
        self.$el
      );
      self.attachEventListeners();
    });
  },
  mounted() {
    console.log("Gridstacklayout mounted = ", this._uid);
    // When 'init' is called no Gridstack items should be present in the layout... If they are present then they would get registered to the Gridstack layout
    // in the init() call itself, we want to manually register the Gridstack items to the layout from within the item itself.
  },
  computed: {
    dndItems() {
      return (this.dnd?.dndItems ?? []).reduce((hash, dndItem) => {
        hash[dndItem.id] = dndItem;
        return hash;
      }, {});
    },
    gridOptions() {
      // Write all the options that will be
      // shared by both gridstack-subgrid and gridstack-container.
      return {
        margin: this.margin,
        disableOneColumnMode: !this.singleColumnMode,
        oneColumnSize: this.singleColumnModeMinW,
        cellHeight: this.rowHeight,
        minRow: this.minRow,
        column: this.columns,
      };
    },
    layoutHash() {
      console.log("Recomputing hash -> ");
      const layoutHash = this.layout.reduce((hashMap, item) => {
        hashMap[item.id] = item;
        return hashMap;
      }, {});
      return layoutHash;
    },
  },
  methods: {
    getMargin() {
      return this.masterGrid.getMargin();
    },
    getRowHeight() {
      return this.masterGrid.getCellHeight();
    },
    updateNumberOfColumns(num, mode = "moveScale") {
      // Supported modes, 'moveScale' | 'move' | 'scale' | 'none'
      this.masterGrid.column(num, mode);
    },
    getItemElementUsingId(id) {
      return this.$el.querySelector(`.grid-stack-item[gs-id="${id}"]`);
    },
    updateItem(item) {
      const el = this.getItemElementUsingId(item.id);
      this.masterGrid.update(el, item);
    },
    saveLayout() {
      this.$emit("layoutChanged");
    },
    removeItemFromModel(id) {
      const index = this.layout.findIndex((item) => item.id == id);
      if (index >= 0) {
        // 'splice' is a mutating method, yes, I am mutating a prop.
        // eslint-disable-next-line vue/no-mutating-props
        this.layout.splice(index, 1);
      } else {
        throw new Error(
          `Error while removing an item from the grid layout.
           The widget with id '${id} doesn't exist in grid layout.`
        );
      }
    },
    removeItem(id) {
      console.log(id);
      // Removes item from 'view'.
      console.log("item to be removed -> ", id);
      const item = this.getItemElementUsingId(id);
      this.masterGrid.removeWidget(item, false); // RemoveDOM = false, don't remove DOM.
    },
    updateLayout(newLayout) {
      this.$emit("layoutUpdate", newLayout);
    },
    isDndItem(item) {
      return item?.el?.hasAttribute("gs-dnd-item-id") && !("id" in item);
    },
    attachEventListeners() {
      const self = this;
      this.masterGrid.on("change added", (event, items) => {
        // console.log("master grid, added / changed => ", items);
        for (const item of items) {
          const { id, w, h, x, y } = item;
          // Yes, I am low key mutating a prop.
          if (self.layoutHash[id]) {
            Object.assign(self.layoutHash[id], { w, h, x, y });
          } else if (self.isDndItem(item)) {
            // Remove the item as soon as it is added.
            // Then layout.push() the item, which will
            // register the item to the model + update the view.
            self.masterGrid.removeWidget(item.el, true);
            const classList = new Set(item?.el.classList);
            if (classList.has(self?.dnd?.class)) {
              // dnd items don't have an id,
              // the id should be generated and assigned by the uidGenerate,
              // which is a callback function provided by the user.
              const dndItemId = item?.el?.getAttribute("gs-dnd-item-id");
              if (dndItemId in self.dndItems) {
                const dndItem = cloneDeep(self.dndItems[dndItemId]);
                Object.assign(dndItem, {
                  x,
                  y,
                  w,
                  h,
                  id: self.dnd?.uidGenerator(),
                });
                // eslint-disable-next-line vue/no-mutating-props
                self.layout.push(dndItem);
              } else {
                throw new Error(
                  `The dnd item that you dropped into this grid cannot be found
                   in the dndItems you supplied... Please include this item in dndItems
                   of the dnd prop that you have supplied to this grid.`
                );
              }
            } else {
              throw new Error(
                `This grid doesn't accept the dnd item that you have dropped into it now.
                 This grid only accepts dnd items having class ${self.dnd?.class}!
                 `
              );
            }
          }
          // else if (false) {

          //   // TODO: Check if an item from any subgrid has been moved into the mastergrid.
          // }
          else {
            throw new Error(
              `We are attempting to apply the '${event.type}' event to a widget that
               does not exist in this grid layout.`
            );
          }
        }
        self.saveLayout();
      });
      this.masterGrid.on("removed", (event, items) => {
        for (const item of items) {
          if (!self.isDndItem(item)) {
            // The item was never added to the model,
            // no point in remove it from the model...
            this.removeItemFromModel(item.id);
          }
        }
        this.saveLayout();
      });
    },
    detachEventListeners() {},
  },
};
</script>

<style lang="scss">
.grid-stack {
  border: 1px solid red;
}
</style>
