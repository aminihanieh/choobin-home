import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type Request = Iam.B2m.Login.Request;
type Response = Iam.B2m.Login.Response.DoLogin;
type GetCaptchaResponse = Iam.B2m.Login.Response.GetCaptcha;

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private httpClient: HttpClient) { }

  getCaptcha(): Promise<GetCaptchaResponse> {
    return this.httpClient
      .get<GetCaptchaResponse>
      (`${environment.ApiUrl}api/B2M/IAM/Login/GetCaptcha`,
        {
          headers: {'Content-Type': 'application/json' },
          withCredentials: false
        })
      .toPromise();
  }

  login(request: Request): Promise<Response> {
    return this.httpClient
      .post<Response>
      (`${environment.ApiUrl}api/B2M/IAM/Login/DoLogin`,
        request,
        {
          headers: {'Content-Type': 'application/json' },
          withCredentials: true
        })
      .toPromise();
  }
}
