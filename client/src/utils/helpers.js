export const formatPrice = (cents) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
};

export const formatDate = (date) => {
  const dateParsed = Date.parse(date);
  return new Intl.DateTimeFormat("en-US").format(dateParsed);
};

export const getDistinctValues = (data, type) => {
  let allValues = data.flatMap((item) =>
    Array.isArray(item[type]) ? item[type] : [item[type]]
  ); // makes sure allValues is not an array of arrays
  const distinctValues = new Set(allValues);
  return ["any", ...distinctValues];
};
