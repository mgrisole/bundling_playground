export default class Hello {

  constructor(
    private name: string,
  ) {}

  public sayHi(text: string) {
      console.log(text);
  }

  public async sayHiLater() {
      this.sayHi(await this.waitUntilSayHi());
  }

  private waitUntilSayHi(): Promise<string> {
      return new Promise<string>(
          (resolve) => setTimeout(() => resolve(`Hi a bit late ${this.name} but in Typescript dude !`), 2000));
  }

}
