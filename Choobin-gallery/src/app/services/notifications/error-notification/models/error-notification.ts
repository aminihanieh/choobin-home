export class ErrorNotificationInfo {

  message: string | undefined;

  id: number;

  constructor() {
    this.id = new Date().getMilliseconds();
  }
}
