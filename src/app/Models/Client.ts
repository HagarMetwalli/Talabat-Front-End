export class Client {
  constructor(

    public clientFname: String,
    public clientLname: String,
    public clientEmail: String,
    public clientDateOfBirth: any,
    public clientGenderIsMale: number,
    public clientNewsletterSubscribe: number,
    public clientSmsSubscribe: number,
    public clientId?: number

  ) { }
}
