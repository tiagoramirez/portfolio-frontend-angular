import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HeaderModule } from '../header/header.module';
import { ProfileModule } from '../profile/profile.module';
import { FirstTimeConfigModule } from '../first-time-config/first-time-config.module';
import { AboutMeModule } from '../about-me/about-me.module';
import { ExperienceModule } from '../experience/experience.module';
import { EducationModule } from '../education/education.module';
import { ProjectModule } from '../project/project.module';
import { SkillModule } from '../skill/skill.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        AboutMeModule,
        EducationModule,
        ExperienceModule,
        FirstTimeConfigModule,
        HeaderModule,
        ProfileModule,
        ProjectModule,
        SkillModule
    ]
})
export class MainModule { }
