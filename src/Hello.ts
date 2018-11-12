export default class Hello {

  constructor(
    private name: string
  ) {}

  private waitUntilSayHi() {
      return new Promise(resolve => setTimeout(() => resolve(`Hi a bit late ${this.name}`), 2000));
  }

  public sayHi (text) {
      console.log(text);
  }

  public async sayHiLater () {
      this.sayHi(await this.waitUntilSayHi());
  }
}
