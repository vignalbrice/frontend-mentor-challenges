export function validateMonth(value: string) {
  // remove all non digit characters
  const valueExt = value.replace(/\D/g, "");

  if (/^\d{2}$/.test(valueExt)) {
    return true;
  }

  return false;
}
