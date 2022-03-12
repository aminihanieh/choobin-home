declare namespace Iam.B2m.Login {
  interface Request {

    username: string;

    password: string;

    language: string;

    captchaToken: string;

    captchaValue: number;
  }
}
