export function validateCVV(cvv: string) {
  // remove all non digit characters
  const CVV = cvv.replace(/\D/g, "");
  // american express and cvv is 4 digits
  if (/^\d{3}$/.test(CVV)) {
    // other card & cvv is 3 digits
    return true;
  }
  return false;
}
