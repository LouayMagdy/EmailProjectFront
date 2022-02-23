
export class EmailMessage{
  private to: Array<string>;
  private from: string;
  private subject: string;
  private body: string;
  private attachment: string;
  private date: string;

  constructor() {
    this.to = [], this.from = "", this.subject = "", this.body = "", this.attachment = "", this.date = "";
  }

  setTo(to : Array<string>){this.to = to;}
  setFrom(from: string){this.from = from}
  setSubject(subject: string){this.subject = subject}
  setBody(body: string){this.body = body}
  setAttachment(attachment: string){this.attachment = attachment}
  setDate(date: string){this.date = date}

  getTo(){return this.to}
  getFrom(){return this.from}
  getSubject(){return this.subject}
  getBody(){return this.body}
  getAttachment(){return this.attachment}
  getDate(){return this.date}
}
