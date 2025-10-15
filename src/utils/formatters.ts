export const formatCost = (cost: number): string => {
  return Number(cost).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatPercentage = (percentage: number): string => {
  return Number(percentage / 100).toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
