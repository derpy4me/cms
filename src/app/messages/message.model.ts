export class Message {
  constructor(
    public id: string,
    public subject: string,
    public msgTesxt: string,
    public sender: string,
    public children?: Message[]
  ) {}
}
