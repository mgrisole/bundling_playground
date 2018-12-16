interface InterfaceMistype {
  index: number;
  letter: string;
}

export default class Sequence {

  private text: string[];
  private mistypeElement = document.createElement("mistype");

  constructor(
    text: string,
    private target: Element,
    private textNode = Text.arguments,
    private keyboard: string[],
    private speed: number,
    private mistype: boolean,
    private mistypeRate: number,
  ) {
    this.text = Array.prototype.slice.call(text);
  }

  public async write() {
    console.log(this.textNode);

    const mistypes: InterfaceMistype[] = [];
    while (this.text.length || mistypes.length) {
      const rand = Math.random();
      const speed = this.speed;
      const mistyped = this.mistype && this.textNode!.length && rand < this.mistypeRate;
      let element = this.target;

      if (this.text.length && (mistyped || !mistypes.length)) {
        let letter = this.text.shift()!;
        if (mistyped) {
          const charCode = letter.charCodeAt(0);
          // tag = this.mistypeTag;
          if (!this.target.querySelector("mistype")) {
            this.target.appendChild(this.mistypeElement);
          }

          mistypes.unshift({
            index: this.textNode!.length,
            letter,
          });

          if (charCode > 96 && charCode < 123) {
            const keyboardLine = this.keyboard.filter((e: string) => e.indexOf(letter) >= 0).shift()!;
            const letterPosition = keyboardLine.indexOf(letter.toLowerCase());
            /* wrongChar = sibbling letter (ex: if t then r or y)
            IF first or last letter of the line
            THEN wrongChar = first letter +1 or last letter -1 (ex for qwerty: if q then w or if n then b) */
            letter = keyboardLine[
              letterPosition +
              (!letterPosition ? 1 :
                letterPosition + 1 === keyboardLine.length ? -1 : (Math.round(Math.random()) ? 1 : -1)
              )
            ];
          }
        }
        this.textNode.nodeValue += await this.typeLetter(speed, letter);
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
      this.textNode.nodeValue = this.textNode.nodeValue!.slice(0, -1);
      resolve(mistype.letter);
    }, t));
  }
}
