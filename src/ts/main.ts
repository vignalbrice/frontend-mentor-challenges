import iconComplete from "../assets/images/icon-complete.svg";
import { validateCVV } from "./helpers/validateCVV";

const form = document.querySelector("form");

const section = document.querySelector("section");

const cardHolderName = document.querySelector<HTMLInputElement>(
  "[name='cardholder-name']"
);
const cardNumber = document.querySelector<HTMLInputElement>(
  "[name='card-number']"
);
const cardMonth = document.querySelector<HTMLInputElement>("[name='month']");

const cardYear = document.querySelector<HTMLInputElement>("[name='year']");

const CVC = document.querySelector<HTMLInputElement>("[name='CVV']");

const cardHolderNameView =
  document.querySelector<HTMLDivElement>("#cardholder-name");

const cardNumberView = document.querySelector<HTMLDivElement>("#card-number");
const cardExpiryDateWrapper =
  document.querySelector<HTMLDivElement>(".expiry-date-form");
const monthView = document.querySelector<HTMLDivElement>(".month-view");
const yearView = document.querySelector<HTMLDivElement>(".year-view");
const cvvView = document.querySelector<HTMLDivElement>("#CVV");

const setValueByEventListener = (e: Event, element: HTMLDivElement) => {
  const target = e.target;
  const value = (target as HTMLInputElement).value;
  element.innerHTML = value;
};

const onElementFocusedAddError = (element: HTMLElement, msg: string) => {
  element?.addEventListener("focusout", (e) => {
    const target = e.target;
    const value = (target as HTMLInputElement).value;
    if (value.length === 0) addError(element, msg);
  });
};

/*const acceptedCreditCards = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard:
    /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover:
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
};
function validateCardNumber(creditCard: string) {
  const creditCardNumber = creditCard.replace(/\D/g, "");
  if (acceptedCreditCards.amex.test(creditCardNumber)) {
    return true;
  }
  return false;
}*/
cardHolderName?.addEventListener("input", (e) => {
  const target = e.target;
  const value = (target as HTMLInputElement).value;
  setValueByEventListener(e, cardHolderNameView!);
  if (value.length > 0) {
    removeError(cardHolderName, document.querySelector(".error")!);
  }
});

// Errors
onElementFocusedAddError(cardHolderName!, "Can't be blank");
onElementFocusedAddError(CVC!, "Can't be blank");
onElementFocusedAddError(cardNumber!, "Wrong format, numbers only");

form!.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    cardHolderName!.value.length > 0 &&
    cardNumber!.value.length > 0 &&
    cardMonth!.value.length > 0 &&
    cardYear!.value.length > 0 &&
    CVC!.value.length > 0
  ) {
    section!.removeChild(form!);
    const successDiv = document.createElement("div");

    successDiv.classList.add("success");
    successDiv.innerHTML = `
    <img src="${iconComplete}" />
    <h1>Thank you!</h1>
    <h3>We’ve added your card details</h3>
    <button type="button">Continue</button>
    `;
    section!.appendChild(successDiv);
  }
});

function addError(element: HTMLElement, msg: string) {
  element.classList.add("error-field");
  const error = document.createElement("small");
  error.classList.add("error");
  error.innerHTML = msg;
  console.log(error !== null);
  if (element.contains(error)) return;
  else element.insertAdjacentElement("afterend", error);
}

function removeError(element: HTMLElement, afterElement: HTMLElement) {
  if (afterElement == null) return;
  element.classList.remove("error-field");
  afterElement.remove();
}

function separateDigitByFourSpaces(value: string) {
  let newVal = "";
  // write regex to remove any space
  const val = value.replace(/\s/g, "");
  // iterate through each numver
  for (var i = 0; i < val.length; i++) {
    // add space if modulus of 4 is 0
    if (i % 4 == 0 && i > 0) newVal = newVal.concat(" ");
    // concatenate the new value
    newVal = newVal.concat(val[i]);
  }
  return newVal;
}

cardNumber?.addEventListener("keyup", (e) => {
  const target = e.target;
  const value = (target as HTMLInputElement).value;
  const newVal = separateDigitByFourSpaces(value);
  cardNumber.value = newVal;
  cardNumberView!.innerHTML = newVal;
});

cardNumber?.addEventListener("keydown", (e) => {
  const target = e.target;
  const value = (target as HTMLInputElement).value;
  const newVal = separateDigitByFourSpaces(value);
  // update the final value in the html input
  if (newVal.length > 18 && e.key !== "Backspace") e.preventDefault();
});

cardMonth?.addEventListener("keyup", (e) => {
  const target = e.currentTarget!;
  const value = (target as HTMLInputElement).value;
  if (value.length > 0) {
    if (Number(value) >= 13 && e.key !== "Backspace") {
      cardMonth.value = value.substring(0, value.length - 1);
      return;
    }
    cardMonth.value = value.replace(/\D/g, "");
    monthView!.innerHTML = value.replace(/\D/g, "");
  } else {
    monthView!.innerHTML = "00";
  }
});

cardMonth?.addEventListener("focusout", (e) => {
  const target = e.currentTarget!;
  const value = (target as HTMLInputElement).value;
  if (value.length === 0) {
    cardMonth.classList.add("error-field");
    const error = document.createElement("small");
    error.classList.add("error");
    error.innerHTML = "Can't be blank";
    cardExpiryDateWrapper?.insertAdjacentElement("afterend", error);
  } else removeError(cardMonth, document.querySelector(".error")!);
});

cardYear?.addEventListener("keyup", (e) => {
  const target = e.currentTarget;
  const value = (target as HTMLInputElement).value;
  if (value.length > 0) {
    cardYear.value = value.replace(/[^0-9]/g, "");
    setValueByEventListener(e, yearView!);
  }
});

cardYear?.addEventListener("focusout", (e) => {
  const target = e.currentTarget!;
  const value = (target as HTMLInputElement).value;
  if (value.length === 0) {
    cardYear?.classList.add("error-field");
    const error = document.createElement("small");
    error.classList.add("error");
    error.innerHTML = "Can't be blank";
    cardExpiryDateWrapper?.insertAdjacentElement("afterend", error);
  } else removeError(cardYear, document.querySelector(".error")!);
});

CVC?.addEventListener("keyup", (e) => {
  const target = e.currentTarget;
  const value = (target as HTMLInputElement).value;
  const validCVV = validateCVV(value);
  if (value.length > 0) {
    removeError(CVC, document.querySelector(".error")!);
    if (validCVV && e.key !== "Backspace") {
      e.preventDefault();
    }
    cvvView!.innerHTML = value.replace(/\D/g, "");
    CVC.value = value.replace(/\D/g, "");
  } else {
    cvvView!.innerHTML = "000";
  }
});
