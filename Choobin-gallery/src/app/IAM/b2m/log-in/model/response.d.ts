declare namespace Iam.B2m.Login.Response {

  interface DoLogin {

    csrfToken: string;

    calendarType: string;

    isLoginSuccessful: boolean;

    captchaToken: string;

    captchaImage: string;
  }

  interface GetCaptcha {

    captchaToken: string;

    captchaImage: string;

  }
}
