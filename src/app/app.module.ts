import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderModule } from './modules/header/header.module';
import { MainProfileModule } from './modules/main-profile/main-profile.module';
import { AboutMeModule } from './modules/about-me/about-me.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { EducationModule } from './modules/education/education.module';
import { SkillsModule } from './modules/skills/skills.module';
import { MyProjectsModule } from './modules/my-projects/my-projects.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from './services/person.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HeaderModule,
        MainProfileModule,
        AboutMeModule,
        ExperienceModule,
        EducationModule,
        SkillsModule,
        MyProjectsModule,
        HttpClientModule
    ],
    providers: [PersonService],
    bootstrap: [AppComponent]
})
export class AppModule { }
