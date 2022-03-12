export class ViewModel implements Iam.B2m.Login.Request {

  username: string;

  password: string;

  language: string = "فارسی - persian";

  languageList: string[] = ["فارسی - persian"]

  captchaToken: string;

  captchaImage: string;

  captchaValue:number;

  showError: boolean =false;

  showPass: boolean = false;
}
