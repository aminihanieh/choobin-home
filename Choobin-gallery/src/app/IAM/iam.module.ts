import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IamComponent } from './iam.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    IamComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "", component: IamComponent, children: [
        { path: "B2m", loadChildren: () => import('./b2m/b2m.module').then(module => module.B2mModule) },
      ]
    }])
  ]
})
export class IamModule { }
