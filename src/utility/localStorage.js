// import { useState, useEffect } from 'react';

// function useLocalStorage(defaultVal, key) {
//   const [val, setVal] = useState(() => {
//     const localVal = window.localStorage.getItem('tables');

//     return localVal !== null ? JSON.parse(localVal) : defaultVal;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(val));
//   }, [key, val]);

//   return [val, setVal];
// }

// export { useLocalStorage };

function getLocalTableData() {
  const tableData = window.localStorage.getItem('tables');

  return tableData !== null ? JSON.parse(tableData) : null;
}

function setLocalTableData(time, tableData) {
  const value = { time: time, tables: tableData };
  window.localStorage.setItem('tables', JSON.stringify(value));
}

export { getLocalTableData, setLocalTableData };
