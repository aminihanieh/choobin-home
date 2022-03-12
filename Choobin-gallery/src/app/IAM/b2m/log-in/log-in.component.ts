import { Component, ViewChild } from '@angular/core';
import { ViewModel } from './model/view-model';
import { LogInService } from './services/log-in.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

type Request = Iam.B2m.Login.Request;
type Response = Iam.B2m.Login.Response.DoLogin;
type CaptchaResponse = Iam.B2m.Login.Response.GetCaptcha;

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  viewModel: ViewModel = new ViewModel()
  @ViewChild('form', { read: NgForm }) form: any;

  constructor(private loginService: LogInService, private router: Router, titleService: Title) {
    titleService.setTitle("سیستم پشتیبان سپهر | ورود");
  }
  ngOnInit(): void {
    this.getCaptcha()
  }

  private getCaptcha() {
    this.loginService.getCaptcha().then((response) => {
      this.initialViewModel(response);
    });
  }

  private initialViewModel(response: CaptchaResponse) {
    this.viewModel.captchaImage = response.captchaImage;
    this.viewModel.captchaToken = response.captchaToken;
  }

  onLoginClick() {
    this.guardAgainstEmptyFields()
    const request: Request = this.createRequest();
    this.loginService.login(request).then((response: Response) => {
      this.setLocalStorage(response);
      this.navigateToB2m();
      if (!response.isLoginSuccessful) {
        this.resetCaptcha(response);
        this.clearLocalStorage()
      };
    })
  }

  private resetCaptcha(response: Response) {
    this.viewModel.captchaImage = response.captchaImage;
    this.viewModel.captchaToken = response.captchaToken;
    this.viewModel.showError = true;
  }

  guardAgainstEmptyFields() {
    if (this.form.invalid) {
      this.viewModel.showError = true;
      throw new Error("All the fields must be filled");
    }
  }

  private navigateToB2m() {
    this.router.navigate(['/fa/BigBang/B2M']);
  }

  private createRequest(): Request {
    return {
      username: this.viewModel.username,
      password: Md5.hashStr(this.viewModel.password),
      language: 'fa',
      captchaToken: this.viewModel.captchaToken,
      captchaValue: this.viewModel.captchaValue
    }
  }

  private setLocalStorage(response: Response) {
    localStorage.setItem("CsrfToken", response.csrfToken);
    localStorage.setItem("CalendarType", response.calendarType);
  }

  private clearLocalStorage() {
    localStorage.removeItem('CsrfToken')
  }

}
