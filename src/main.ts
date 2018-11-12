import Hello from './Hello';

export default class Yolo {

    constructor () {}

    public run () {
        let a = new Hello('Mark');

        a.sayHi('Hi Mark');
        a.sayHiLater();
    }
}