export class Note {
  public id: string;
  public name: string;
  public message?: string;
  public createdAt?: string;
  public expiresAt?: string;
  public keyVisits?: number;
  public maxVisits?: number;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
