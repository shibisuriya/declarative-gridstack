const getUpdatedLayout = (prevLayout, itemToUpdate = {}) => {
  const { x, y, w, h, id } = itemToUpdate;
  return prevLayout.map((item) => {
    if (item.id === id) {
      item = { ...item, x, y, w, h };
    } else if ("children" in item) {
      // 'item' is a subgrid!
      return {
        ...item,
        children: getUpdatedLayout(item.children, itemToUpdate),
      };
    }
    return item;
  });
};
export default getUpdatedLayout;
