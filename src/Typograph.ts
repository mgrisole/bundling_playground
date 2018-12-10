import {keyboards} from "./Keyboards";
import Sequence from "./Sequence";
import InterfaceParams from "./TypographParamsInterface";

export default class Typograph {
  private sequences: Sequence[] = [];
  private params: InterfaceParams;

  constructor(p: InterfaceParams) {
    this.params = {
      ...p,
      mistype: !!p.mistype,
      mistypeRate: p.mistypeRate || 0.3,
      speed: p.speed || 250,
    };
  }

  public type(callback?: () => void): void {
    this.sequences = this.initSequences();
    this.sequences.forEach((sequence: Sequence) => sequence.write());
  }

  private initSequences(): Sequence[] {
    return Array.from(document.querySelectorAll(this.params.selector)).map((el: Element) => {
      const sequence = new Sequence(
        this.params.text || el.getAttribute("data-typeit") || el.textContent || "",
        el,
        keyboards[this.params.keyboard || "qwerty"],
        this.params.speed!,
        this.params.mistype!,
        this.params.mistypeRate!,
      );
      el.textContent = "";
      return sequence;
    });
  }
}
