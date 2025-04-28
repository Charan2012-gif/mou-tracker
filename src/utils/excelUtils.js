import * as XLSX from 'xlsx';

export const saveMOUToExcel = (mouData) => {
  let mous = JSON.parse(localStorage.getItem('mous')) || [];
  mous.push(mouData);
  localStorage.setItem('mous', JSON.stringify(mous));
  
  // Create Excel file
  const ws = XLSX.utils.json_to_sheet(mous);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "MOUs");
  XLSX.writeFile(wb, "mou_data.xlsx");
};

export const getFilteredMOUs = (filters) => {
  const mous = JSON.parse(localStorage.getItem('mous')) || [];
  return mous.filter(mou => {
    return Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      return String(mou[key]).toLowerCase().includes(String(filters[key]).toLowerCase());
    });
  });
};

export const downloadFilteredMOUs = (filters) => {
  const filteredData = getFilteredMOUs(filters);
  const ws = XLSX.utils.json_to_sheet(filteredData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Filtered MOUs");
  XLSX.writeFile(wb, "filtered_mou_data.xlsx");
};