interface InterfaceMistype {
    index: number;
    letter: string;
}
export default class Sequence {
    private target;
    private keyboard;
    private speed;
    private mistype;
    private mistypeRate;
    private text;
    private mistypeElement;
    private finalTextNode;
    private textNode;
    constructor(text: string, target: Element, keyboard: string[], speed: number, mistype: boolean, mistypeRate: number);
    write(): Promise<InterfaceMistype[]>;
    private typeLetter;
    private removeLetter;
}
export {};
