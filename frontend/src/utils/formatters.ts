export const formatPrice = (price: number) => {
  const params = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  return Intl.NumberFormat("pt-BR", params).format(price);
};

export const formatDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toISOString();
};
