const actualYear = new Date().getFullYear();

export const validationDay = (element: HTMLInputElement) => {
  const value = parseInt(element.value);
  if (value > 31 || value < 1) {
    return "Must be a valid day";
  }
  return true
};

export const validationMonth = (element: HTMLInputElement) => {
  const value = parseInt(element.value);
  if (value > 12 || value < 1) {
    return "Must be a valid month";
  }
  return true
};

export const validationYear = (element: HTMLInputElement) => {
  const value = parseInt(element.value);
  if (value > actualYear || value < 1900) {
    return "Must be in the past";
  }
  return true
};
