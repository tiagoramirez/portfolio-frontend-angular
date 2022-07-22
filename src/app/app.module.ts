import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceEducationComponent } from './components/experience-education/experience-education.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainProfileComponent,
    AboutMeComponent,
    ExperienceEducationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
