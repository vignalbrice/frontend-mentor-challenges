interface IRange {
  initializeRange: () => void;
}

type RangeProperties = {
  bg: string;
  slider: string;
};

type RangeAttributes = RangeProperties & {
  range: HTMLInputElement;
  value: string;
};

export class Range implements IRange {
  private range: HTMLInputElement;

  constructor(range: HTMLInputElement) {
    this.range = range;
  }

  public getRangeInput(): HTMLInputElement {
    return this.range;
  }

  public initializeRange() {
    const { bg, slider } = this.getBgAndSliderProperties(this.range);
    this.setRangeAttributes({
      bg,
      value: this.range.value,
      range: this.range,
      slider,
    });
  }

  private getBgAndSliderProperties(range: HTMLInputElement): RangeProperties {
    const bg = getComputedStyle(range).getPropertyValue("--background");
    const slider = getComputedStyle(range).getPropertyValue("--slider");
    return {
      bg,
      slider,
    };
  }

  public setRangeAttributes({
    bg,
    value,
    range,
    slider,
  }: RangeAttributes): void {
    range.setAttribute(
      "style",
      `background:linear-gradient(to right,${slider},${slider} ${parseInt(
        value
      )}%,${bg} ${parseInt(value)}%)`
    );
  }
}
