export const formatNumber = (number?: number, maxN: number = 1) => {
  return number
    ? Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: maxN
      }).format(number)
    : null;
};
