import defaultOptions from "./defaultOptions";
import { cloneDeep } from "lodash";
const getGridOptions = (props = {}) => {
  const {
    columns = defaultOptions.columns,
    minRow = defaultOptions.minRow,
    margin = defaultOptions.margin,
    singleColumnMode = defaultOptions.singleColumnMode,
    singleColumnModeMinW = defaultOptions.singleColumnModeMinW,
    rowHeight = defaultOptions.rowHeight,
  } = props ?? {};
  // cloneDeep so that the user is not able to change the props ones supplied to the
  // grid.
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
