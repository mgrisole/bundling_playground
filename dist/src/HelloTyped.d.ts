export default class Hello {
    private name;
    constructor(name: string);
    sayHi(text: string): void;
    sayHiLater(): Promise<void>;
    private waitUntilSayHi;
}
