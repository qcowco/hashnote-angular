export class Note {
  private id: string;
  private name: string;
  private message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
