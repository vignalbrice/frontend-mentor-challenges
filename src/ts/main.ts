import { Range } from "./class/Range";

export {};

const rangeHTMLElement = document.querySelector<HTMLInputElement>("#slider")!;

const range = new Range(rangeHTMLElement);

// Initiliaze the range value at 50 percent
range.initializeRange();
// Add layer to copntrols range value
rangeHTMLElement.addEventListener("input", function (ev) {
  const target = ev.target;
  const value = (target as HTMLInputElement).value;
  const bg = window
    .getComputedStyle(range.getRangeInput())
    .getPropertyValue("--background");
  const slider = getComputedStyle(range.getRangeInput()).getPropertyValue(
    "--slider"
  );
  range.setRangeAttributes({
    bg,
    value,
    range: this,
    slider,
  });
});
