import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B2mComponent } from '../b2m/b2m.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    B2mComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "", component: B2mComponent, children: [
        { path: "Login", loadChildren: () => import('./log-in/log-in.module').then(module => module.LogInModule) },
      ]
    }])
  ]
})
export class B2mModule { }
