import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { LinkToGalleryComponent } from './components/link-to-gallery/link-to-gallery.component';
import { AdvantagesComponent } from './components/advantages/advantages.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    HeaderComponent,
    LinkToGalleryComponent,
    AdvantagesComponent,
    RecommendedComponent,
    TestimonialComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
