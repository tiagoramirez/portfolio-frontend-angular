import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';
import { MainProfileModule } from '../main-profile/main-profile.module';
import { AboutMeModule } from '../about-me/about-me.module';
import { ExperienceModule } from '../experience/experience.module';
import { EducationModule } from '../education/education.module';
import { SkillsModule } from '../skills/skills.module';
import { MyProjectsModule } from '../my-projects/my-projects.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { PersonService } from './services/person.service';
import { ConfigurationService } from './services/configuration.service';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        HeaderModule,
        MainProfileModule,
        AboutMeModule,
        ExperienceModule,
        EducationModule,
        SkillsModule,
        MyProjectsModule,
        HttpClientModule
    ],
    providers: [PersonService, ConfigurationService]
})
export class MainModule { }
