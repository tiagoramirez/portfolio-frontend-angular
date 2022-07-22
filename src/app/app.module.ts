import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainProfileComponent,
    AboutMeComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
