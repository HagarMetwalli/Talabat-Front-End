export class Client {
  constructor(
    public clientFname: String,
    public clientLname: String,
    public clientEmail: string,
    public clientDateOfBirth: any,
    public clientPassword: String,
    public clientGenderIsMale: number,
    public clientNewsletterSubscribe: number,
    public clientSmsSubscribe: number,
    public clientId?: number
  ) {}
}
