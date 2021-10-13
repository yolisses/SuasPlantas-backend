export class VisibleError {
  status:number;

  message:string;

  constructor(status:number, message:string) {
    this.status = status;
    this.message = message;
  }
}

export function error(status:number, message:string) {
  throw new VisibleError(status, message);
}
