export class EncryptionCredentials {
  private idKeyPair: string;

  constructor(idKeyPair: string) {
    this.idKeyPair = idKeyPair;
  }

  public getId() {
    return this.idKeyPair.split('/')[0];
  }

  public getKey() {
    return this.idKeyPair.split('/')[1];
  }
}
