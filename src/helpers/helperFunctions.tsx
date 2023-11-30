export const convertExcelDate = (excelDate: any) => {
  let date = new Date((excelDate - 25569) * 86400 * 1000).toString().split(" ");
  let newFormat = ` ${date[2]}  ${date[1]}, ${date[3]}`;
  return newFormat;
};

export const convertDateFormat = (oldDate: any) => {
  let date = new Date(oldDate).toString().split(" ");
  let newFormat = ` ${date[2]}  ${date[1]}, ${date[3]}`;
  return newFormat;
};

export function numberWithCommas(x: number) {
  const newNum = Number(x.toFixed(2));
  return newNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const excelDateToJavaScriptDate = (excelDate: any) => {
  if (typeof excelDate !== "number" || excelDate < 1) {
    return excelDate;
  }

  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date.toISOString();
};

export const formatName = (originalName: string) => {
  return originalName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
