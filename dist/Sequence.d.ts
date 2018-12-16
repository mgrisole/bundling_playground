interface InterfaceMistype {
    index: number;
    letter: string;
}
export default class Sequence {
    private target;
    private textNode;
    private keyboard;
    private speed;
    private mistype;
    private mistypeRate;
    private text;
    private mistypeElement;
    constructor(text: string, target: Element, textNode: any, keyboard: string[], speed: number, mistype: boolean, mistypeRate: number);
    write(): Promise<InterfaceMistype[]>;
    private typeLetter;
    private removeLetter;
}
export {};
