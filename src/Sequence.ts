interface InterfaceMistype {
  index: number;
  letter: string;
}

export default class Sequence {

  private text: string[];
  private mistypeTag = document.createElement("mistype");

  constructor(
    text: string,
    private target: Element,
    private keyboard: string[],
    private speed: number,
    private mistype: boolean,
    private mistypeRate: number,
  ) {
    this.text = Array.prototype.slice.call(text);
  }

  public async write() {
    const mistypes: InterfaceMistype[] = [];
    while (this.text.length || mistypes.length) {
      const rand = Math.random();
      const speed = this.speed;
      const mistyped = this.mistype && this.target.textContent!.length && rand < this.mistypeRate;
      let tag = this.target;

      if (this.text.length && (mistyped || !mistypes.length)) {
        let letter = this.text.shift()!;
        const charCode = letter.charCodeAt(0);
        if (mistyped && charCode > 96 && charCode < 123 ) {
          tag = this.mistypeTag;
          mistypes.unshift({
            index: this.target.textContent!.length,
            letter,
          });

          const keyboardLine = this.keyboard.filter((e: string) => e.indexOf(letter) >= 0).shift()!;
          console.log(this.keyboard);
          console.log(keyboardLine);
          const letterPosition = keyboardLine.indexOf(letter.toLowerCase());
          // wrongChar = sibbling letter (ex: if t then r or y)
          // IF first or last letter of the line
          // THEN wrongChar = first letter +1 or last letter -1 (ex for qwerty: if q then w or if n then b)
          letter = keyboardLine[
            letterPosition +
            (!letterPosition ? 1 :
              letterPosition + 1 === keyboardLine.length ? -1 : (Math.round(Math.random()) ? 1 : -1)
            )
          ];
        }
        this.target.textContent += await this.typeLetter(speed, letter);
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
