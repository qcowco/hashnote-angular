export class Note {
  public id: string;
  public name: string;
  public message?: string;
  public createdAt?: Date;
  public expiresAt?: Date;
  public keyVisits?: number;
  public maxVisits?: number;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
