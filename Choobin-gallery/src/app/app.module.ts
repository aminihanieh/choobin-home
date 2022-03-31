import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorNotificationHttpInterceptorService } from './services/notifications/error-notification/error-notification-http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerHttpInterceptorService } from './services/spinner/spinner-http-interceptor.service';
import { AppModule as StartupAppModule } from 'src/app/app.module';
import { HomeModule } from './home/home.module';





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorNotificationHttpInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerHttpInterceptorService,
    multi: true
  },
  ],
}
)

export class AppModule {
  static forRoot(): ModuleWithProviders<StartupAppModule> {
    return {
      ngModule: StartupAppModule,
    }
  }
}
