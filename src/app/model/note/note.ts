export class Note {
  public id: string;
  public name: string;
  public message?: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
