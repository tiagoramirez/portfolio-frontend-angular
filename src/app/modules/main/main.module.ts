import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './components/main/main.component'
import { HeaderModule } from '../header/header.module'
import { ProfileModule } from '../profile/profile.module'
import { AboutMeModule } from '../about-me/about-me.module'
import { ExperienceModule } from '../experience/experience.module'
import { EducationModule } from '../education/education.module'
import { ProjectModule } from '../project/project.module'
import { SkillModule } from '../skill/skill.module'
import { SocialMediaModule } from '../social-media/social-media.module'

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        AboutMeModule,
        EducationModule,
        ExperienceModule,
        HeaderModule,
        ProfileModule,
        ProjectModule,
        SkillModule,
        SocialMediaModule
    ]
})
export class MainModule { }
