export function legthDefaultValidation(value: string): boolean {
  return /^.{3,80}$/.test(value);
}

export function birthDateValidation(value: string): boolean {
  const date = new Date(value);
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  if (date <= eighteenYearsAgo) return true;
  else return false;
}

export function emailValidation(value: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
}

export function passwordValidation(value: string): boolean {
  return /^.{8,}$/.test(value);
}

export function streetValidation(value: string): boolean {
  return /^\S.{2}[a-zA-Z\s\d\W]*$/g.test(value);
}

export function cepValidation(value: string): boolean {
  return /^[0-9]{5}-[0-9]{3}$/.test(value);
}

export function numberValidation(number: string): boolean {
  const addressNumber = Number(number).toFixed(0);
  return Number(addressNumber) > 0;
}

export function neighborhoodValidation(value: string): boolean {
  return /^\S.{2}[a-zA-Z\s\d\W]*$/g.test(value);
}

export function StateValidation(value: string): boolean {
  return /^[A-Z]{2}$/.test(value);
}
