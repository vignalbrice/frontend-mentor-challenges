const range = document.querySelector<HTMLInputElement>(".slider")!;
const characterView =
  document.querySelector<HTMLDivElement>(".character-view")!;
const strengthForceTitle = document.querySelector<HTMLSpanElement>(
  ".strength-force-title"
)!;

const COLORS = {
  $neongreen: "#a4ffaf",
  $red: "#f64a4a",
  $orange: "#fb7c58",
  $yellow: "#f8cd65",
  $almostwhite: "#e6e5ea",
  $dakrgrey: "#24232c",
};

const barsContainer = document.querySelector(".strength-force-bars")!;
const passwordInput =
  document.querySelector<HTMLInputElement>(".password-text")!;

const clipboardBtn =
  document.querySelector<HTMLButtonElement>(".clipboard-btn");

enum PasswordStrength {
  TOO_WEAK = "Too Weak!",
  WEAK = "Weak",
  MEDIUM = "Medium",
  STRONG = "Strong",
}
const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const makePasswordByLength = (length: number) => {
  let result = "";
  const charactersLength = CHARACTERS.length;
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const fillBarsByColorElement = (
  color: string,
  element: HTMLDivElement | null
) => {
  if (element) {
    element.style.backgroundColor = color;
    element.style.borderColor = color;
  }
};

const removeBarsColoredByElement = (element: HTMLDivElement) => {
  element.style.backgroundColor = COLORS.$dakrgrey;
  element.style.borderColor = COLORS.$almostwhite;
};

const fillBars = (
  index: number,
  color: string,
  elements: NodeListOf<HTMLDivElement>
) => {
  for (let i = 0; i <= elements.length; i++) {
    if (i <= index) {
      fillBarsByColorElement(color, elements.item(i));
    } else if (elements.item(i)) {
      removeBarsColoredByElement(elements.item(i));
    }
  }
};

const getStrengthPasswordByValue = (
  strengthValue: string,
  elements: NodeListOf<HTMLDivElement>
) => {
  const strength = parseInt(strengthValue);
  const password = makePasswordByLength(strength);
  passwordInput.value = password;

  if (strength >= 1 && strength <= 5) {
    strengthForceTitle.innerHTML = PasswordStrength.TOO_WEAK;
    fillBars(0, COLORS.$red, elements);
  } else if (strength > 5 && strength < 10) {
    strengthForceTitle.innerHTML = PasswordStrength.WEAK;
    fillBars(1, COLORS.$orange, elements);
  } else if (strength >= 10 && strength <= 15) {
    strengthForceTitle.innerHTML = PasswordStrength.MEDIUM;
    fillBars(2, COLORS.$yellow, elements);
  } else if (strength > 15) {
    strengthForceTitle.innerHTML = PasswordStrength.STRONG;
    fillBars(elements.length, COLORS.$neongreen, elements);
  }
};

//  Initiliaze the range value at 50 percent
const initializeRangeValue = () => {
  const bg = window.getComputedStyle(range).getPropertyValue("--background");
  const slider = getComputedStyle(range).getPropertyValue("--slider");
  characterView.innerHTML = range.value;
  strengthForceTitle.innerHTML = "Medium";
  for (let i = 0; i < 3; i++) {
    barsContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="bar filled"></div>`
    );
  }

  barsContainer.insertAdjacentHTML("beforeend", `<div class="bar"></div>`);

  range.setAttribute(
    "style",
    `background:linear-gradient(to right,${slider},${slider} ${
      parseInt(range!.value) * 5
    }%,${bg} ${parseInt(range!.value) * 5}%)`
  );
  const bars = document.querySelectorAll<HTMLDivElement>(".bar");
  fillBars(2, COLORS.$yellow, bars);
  return bars;
};
// Get nodeList Elements
const elements = initializeRangeValue();

// Add layer to copntrols range value
range!.addEventListener("input", function (ev) {
  const target = ev.target;
  const value = (target as HTMLInputElement).value;
  characterView.innerHTML = value;
  const bg = window.getComputedStyle(range!).getPropertyValue("--background");
  const slider = getComputedStyle(range!).getPropertyValue("--slider");
  getStrengthPasswordByValue(value, elements);
  range!.setAttribute(
    "style",
    `background:linear-gradient(to right,${slider},${slider} ${
      parseInt(value) * 5
    }%,${bg} ${parseInt(value) * 5}%)`
  );
});

const copyTextToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

clipboardBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  copyTextToClipboard(passwordInput.value);
  clipboardBtn.insertAdjacentHTML(
    "beforebegin",
    "<p class='clipboard-text'>Copied</p>"
  );
  setTimeout(() => {
    document.querySelector(".clipboard-text")!.remove();
  }, 900);
});
