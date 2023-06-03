import defaultOptions from "./defaultOptions";
import cloneDeep from "lodash/cloneDeep";
const getGridOptions = (props = {}) => {
  const {
    columns = defaultOptions.columns,
    minRow = defaultOptions.minRow,
    margin = defaultOptions.margin,
    singleColumnMode = defaultOptions.singleColumnMode,
    singleColumnModeMinW = defaultOptions.singleColumnModeMinW,
    rowHeight = defaultOptions.rowHeight,
  } = props ?? {};
  return cloneDeep({
    margin,
    disableOneColumnMode: !singleColumnMode,
    oneColumnSize: singleColumnModeMinW,
    cellHeight: rowHeight,
    minRow: minRow,
    column: columns,
  });
};
export default getGridOptions;
