export default class Hello {

    constructor (name) {
        this.name = name;
    }

    waitUntilSayHi() {
        return new Promise(resolve => setTimeout(() => resolve(`Hi a bit late ${this.name}`), 2000));
    }

    sayHi (text) {
        console.log(text);
    }

    async sayHiLater () {
        this.sayHi(await this.waitUntilSayHi());
    }
}
