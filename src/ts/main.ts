import { validationMonth } from "./errors";
import { isNumber } from "./utils";

const inputs = document.querySelectorAll("input");
const dayInput = document.querySelector<HTMLInputElement>("#day")!;
const monthInput = document.querySelector<HTMLInputElement>("#month")!;
const yearInput = document.querySelector<HTMLInputElement>("#year")!;



const button = document.querySelector<HTMLButtonElement>("button")!;
// Results
const dataDay = document.querySelector<HTMLInputElement>(".data-day-result")!;
const dataMonth =
  document.querySelector<HTMLInputElement>(".data-month-result")!;
const dataYear = document.querySelector<HTMLInputElement>(".data-year-result")!;

inputs.forEach((el) => {
  el.addEventListener("keypress", (e) => {
    if (!isNumber(e)) {
      e.preventDefault();
    }
  });
});

[dayInput, monthInput].map((elem) => {
  elem.addEventListener("keypress", (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    if (value.length > 1) {
      e.preventDefault();
    }
  });
});

const actualYear = new Date().getFullYear();
const actualMonth = new Date().getMonth() + 1;
const actualDay = new Date().getDate();

dayInput.addEventListener("focusout", createValidator(dayInput));
monthInput.addEventListener("focusout", createValidator(monthInput));
yearInput.addEventListener("focusout", createValidator(yearInput));

yearInput.setAttribute("max", actualYear.toString());

[dayInput, monthInput, yearInput].forEach(
  (elem) => (elem.onkeyup = setMaxInput(elem))
);
function createValidator(element: HTMLInputElement) {
  return function () {
    const value = parseInt(element.value);
    if (value < 10) element.value = element.value.padStart(2, "0");
  };
}

function setMaxInput(element: HTMLInputElement) {
  return function () {
    const max = parseInt(element.getAttribute("max")!) || 0;
    let value = parseInt(element.value);
    if (value > max) value = max;
  };
}

function calculateAge(year: number, month: number, day: number) {
  const months = month > actualMonth ? month - actualMonth : actualMonth - month;
  const days = actualDay + day;
  const years =
    months === month && days === days
      ? actualYear - year
      : actualYear - year;
  return {
    years,
    months,
    days,
  };
}

dayInput.addEventListener('focusout', (_e) => {
  const label = document.querySelector("#label-day")!;
  if (document.querySelector("#error-day") === null) {
    if (dayInput.value.length === 0) {
      const p = document.createElement("p");
      p.id = "error-day";
      p.textContent = "Please fill this field";
      p.classList.add("error-text");
      label.classList.add("error-text");
      dayInput.classList.add("border-error");
      dayInput.insertAdjacentElement("afterend", p);
    }
  } else {
    dayInput.classList.remove("border-error");
    label.classList.remove("error-text");
    document.querySelector("#error-day")?.remove();
  }

});
monthInput.addEventListener('focusout', (_e) => {
  const label = document.querySelector("#label-month")!;
  if (document.querySelector("#error-month") === null) {

    if (monthInput.value.length === 0) {
      const p = document.createElement("p");
      p.id = "error-month";
      p.textContent = "Please fill this field";
      p.classList.add("error-text");
      label.classList.add("error-text");
      monthInput.classList.add("border-error");
      monthInput.insertAdjacentElement("afterend", p);
    }
  } else {
    monthInput.classList.remove("border-error");
    label.classList.remove("error-text");
    document.querySelector("#error-month")?.remove();
  }

});
yearInput.addEventListener('focusout', (_e) => {
  const label = document.querySelector("#label-year")!;
  if (document.querySelector("#error-year") === null) {
    if (yearInput.value.length === 0) {
      const p = document.createElement("p");
      p.id = "error-year";
      p.textContent = "Please fill this field";
      p.classList.add("error-text");
      label.classList.add("error-text");
      yearInput.classList.add("border-error");
      yearInput.insertAdjacentElement("afterend", p);
    }
  } else {
    yearInput.classList.remove("border-error");
    label.classList.remove("error-text");
    document.querySelector("#error-year")?.remove();
  }

});


button.addEventListener("click", (e) => {
  e.preventDefault();
  if (dayInput.value.length === 0 && monthInput.value.length === 0 && yearInput.value.length === 0) {
    return
  }
  const { days, months, years } = calculateAge(
    parseInt(yearInput.value),
    parseInt(monthInput.value),
    parseInt(dayInput.value)
  );
  [dataDay, dataMonth, dataYear].forEach((el) => el.classList.add("age"));
  dataDay.innerHTML = days.toString().padStart(2, "0");
  dataMonth.innerHTML = months.toString().padStart(2, "0");
  dataYear.innerHTML = years.toString();
  setTimeout(() => {
    [dataDay, dataMonth, dataYear].forEach((el) => el.classList.remove("age"));
  }, 1000)

});
