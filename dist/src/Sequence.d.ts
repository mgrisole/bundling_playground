interface InterfaceMistype {
    index: number;
    letter: string;
}
export default class Sequence {
    private target;
    private keyboard;
    private speed;
    private mistype;
    private text;
    private mistypeTag;
    constructor(text: string, target: Element, keyboard: string[], speed: number, mistype: boolean);
    write(): Promise<InterfaceMistype[]>;
    private typeLetter;
    private removeLetter;
}
export {};
