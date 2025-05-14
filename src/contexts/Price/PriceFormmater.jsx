export const Formatter = (price) => {
  let formatedPrice = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
  return formatedPrice;
};
