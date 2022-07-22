import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MainProfileComponent,
        AboutMeComponent,
        ExperienceComponent,
        EducationComponent,
        SkillsComponent,
        MyProjectsComponent
    ],
    imports: [
        BrowserModule,
        NgCircleProgressModule.forRoot({
            radius: 100,
            animation: true,
            animationDuration: 400,
            outerStrokeWidth: 6,
            innerStrokeWidth: 2,
            outerStrokeColor: "#66fcf1",
            innerStrokeColor: "#45A29E",
            titleColor: '#c5c6c7',
            titleFontSize: '1.7rem',
            titleFontWeight: '700',
            subtitleColor: '#858585',
            subtitleFontSize: '1.1rem',
            lazy: true,
        })

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
