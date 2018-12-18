interface InterfaceMistype {
  index: number;
  letter: string;
}

export default class Sequence {

  private text: string[];
  private mistypeElement = document.createElement("mistype");
  private finalTextNode: Text;
  private textNode: Text;

  constructor(
    text: string,
    private target: Element,
    private keyboard: string[],
    private speed: number,
    private mistype: boolean,
    private mistypeRate: number,
    private selectBeforeErase: boolean,
  ) {
    this.text = Array.prototype.slice.call(text);
    this.textNode = document.createTextNode("");
    this.finalTextNode = this.textNode;
  }

  public async write() {
    const mistypes: InterfaceMistype[] = [];
    this.target.insertBefore(this.textNode, this.target.firstChild);
    while (this.text.length || mistypes.length) {
      const rand = Math.random();
      const speed = this.speed;
      const mistyped = this.mistype && this.finalTextNode!.length && rand < this.mistypeRate;

      if (this.text.length && (mistyped || !mistypes.length)) {
        let letter = this.text.shift()!;
        if (mistyped) {
          const charCode = letter.charCodeAt(0);
          if (!this.target.querySelector("mistype")) {
            this.textNode.after(this.mistypeElement);
            this.finalTextNode = this.mistypeElement.appendChild(document.createTextNode(""));
          }

          mistypes.unshift({
            index: this.finalTextNode!.length,
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
        this.finalTextNode.nodeValue += await this.typeLetter(speed, letter);
      } else {
        while (mistypes.length) {
          this.finalTextNode.nodeValue = await this.removeLetter(speed, mistypes.shift()!);
        }
        this.finalTextNode = this.textNode;
        this.mistypeElement.remove();
      }
    }

    return mistypes;
  }

  private typeLetter(delay: number, letter: string): Promise<string> {
    return new Promise((resolve: (letter: string) => void) => setTimeout(() => resolve(letter!), delay));
  }

  private removeLetter(delay: number, mistype: InterfaceMistype): Promise<string> {
    return new Promise((resolve: (letter: string) => void) => setTimeout(() => {
      this.text.unshift(mistype.letter);
      resolve(this.finalTextNode.nodeValue!.slice(0, -1));
    }, delay));
  }
}
