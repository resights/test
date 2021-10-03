export function filterData(data, filters) {
  return data.filter(item => {
    for (const key of Object.keys(filters)) {
      if (item[key] !== filters[key]) return;
    }
    return item;
  });
}
