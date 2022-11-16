function getLocalTableData() {
  const tableData = window.localStorage.getItem('tables');

  return tableData !== null ? JSON.parse(tableData) : null;
}

function setLocalTableData(time, tableData) {
  const value = { time: time, tables: tableData };
  window.localStorage.setItem('tables', JSON.stringify(value));
}

export { getLocalTableData, setLocalTableData };
