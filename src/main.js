import Hello from './Hello';

export default class Yolo {

    constructor () {}

    run () {
        let a = new Hello('Mark');

        a.sayHi();
    }
}