export const formatPrice = (price: number) => {
  const params = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  return Intl.NumberFormat("pt-BR", params).format(price);
};

export const formatDateToISO = (date: string): string => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 3);
  return newDate.toISOString();
};

export const formatDateToUS = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toISOString().substring(0, 10);
};

export const formatDateToPTBR = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("pt-BR");
};
