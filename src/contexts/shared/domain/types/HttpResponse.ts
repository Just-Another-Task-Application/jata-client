export class HttpResponse<T> {
  public length: number;
  public ok?: boolean;
  public data: T;

  constructor(response: HttpResponse<T>) {
    Object.assign(this, response);
  }
}