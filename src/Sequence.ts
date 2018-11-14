interface InterfaceMistype {
  index: number;
  letter: string;
}

export default class Sequence {

  private text: string[];
  private mistypeTag = document.createElement('mistype');

  constructor(
    text: string,
    private target: Element,
    private keyboard: string[],
    private speed: number,
    private mistype: boolean,
  ) {
    this.text = Array.prototype.slice.call(text);
  }

  public async write() {
    const mistypes: InterfaceMistype[] = [];
    while (this.text.length || mistypes.length) {
      const rand = Math.random();
      const speed = this.speed;
      const mistyped = this.mistype && this.target.textContent!.length && rand > 0.6;
      let tag = this.target;

      if (this.text.length && (mistyped || !mistypes.length)) {
        const letter = this.text.shift()!;
        if (mistyped) {
          tag = this.mistypeTag;
          mistypes.unshift({
            index: this.target.textContent!.length,
            letter,
          });
        }
        this.target.textContent += await this.typeLetter(speed, mistyped ? '@' : letter);
      } else {
        while (mistypes.length) {
          this.text.unshift(await this.removeLetter(speed, mistypes.shift()!));
        }
      }
    }

    return mistypes;
  }

  private typeLetter(t: number, letter: string): Promise<string> {
    return new Promise((resolve: (letter: string) => void) => setTimeout(() => resolve(letter!), t));
  }

  private removeLetter(t: number, mistype: InterfaceMistype): Promise<string> {
    return new Promise((resolve: (letter: string) => void) => setTimeout(() => {
      this.target.textContent = this.target.textContent!.slice(0, -1);
      resolve(mistype.letter);
    }, t));
  }
}
