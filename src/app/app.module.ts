import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { UserListComponent } from './auth/components/user-list/user-list.component';
import { MainComponent } from './modules/main/components/main/main.component';
import { MainModule } from './modules/main/main.module';
import { EditProfileComponent } from './modules/profile/components/edit-profile/edit-profile.component';
import { BannerService } from './services/banner.service';
import { ConfigurationService } from './services/configuration.service';
import { PhotoService } from './services/photo.service';
import { ProfileService } from './services/profile.service';
import { SocialMediaService } from './services/social-media.service';
import { EditPhotoComponent } from './modules/profile/components/edit-photo/edit-photo.component';
import { AboutMeService } from './services/about-me.service';
import { ExperienceService } from './services/experience.service';
import { DescriptionService } from './services/description.service';
import { ProjectService } from './services/project.service';
import { EducationService } from './services/education.service';
import { EditAboutMeComponent } from './modules/about-me/components/edit-about-me/edit-about-me.component';
import { NewExperienceComponent } from './modules/experience/components/new-experience/new-experience.component';
import { EditExperienceComponent } from './modules/experience/components/edit-experience/edit-experience.component';
import { DeleteExperienceComponent } from './modules/experience/components/delete-experience/delete-experience.component';
import { NewEducationComponent } from './modules/education/components/new-education/new-education.component';
import { EditEducationComponent } from './modules/education/components/edit-education/edit-education.component';
import { DeleteEducationComponent } from './modules/education/components/delete-education/delete-education.component';
import { NewProjectComponent } from './modules/project/components/new-project/new-project.component';
import { EditProjectComponent } from './modules/project/components/edit-project/edit-project.component';
import { DeleteProjectComponent } from './modules/project/components/delete-project/delete-project.component';
import { ListSkillComponent } from './modules/skill/components/list-skill/list-skill.component';
import { SkillService } from './services/skill.service';
import { NewSkillComponent } from './modules/skill/components/new-skill/new-skill.component';
import { DeleteSkillComponent } from './modules/skill/components/delete-skill/delete-skill.component';
import { NewSocialMediaComponent } from './modules/social-media/components/new-social-media/new-social-media.component';
import { EditSocialMediaComponent } from './modules/social-media/components/edit-social-media/edit-social-media.component';
import { DeleteSocialMediaComponent } from './modules/social-media/components/delete-social-media/delete-social-media.component';
import { ListSocialMediaComponent } from './modules/social-media/components/list-social-media/list-social-media.component';

const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: ':username', component: MainComponent },
    { path: ':username/social-media/list', component: ListSocialMediaComponent },
    { path: ':username/social-media/add', component: NewSocialMediaComponent },
    { path: ':username/social-media/edit/:idSm', component: EditSocialMediaComponent },
    { path: ':username/social-media/delete/:idSm', component: DeleteSocialMediaComponent },
    { path: ':username/profile/edit/:profileId', component: EditProfileComponent },
    { path: ':username/profile/edit/img/:type', component: EditPhotoComponent },
    { path: ':username/about-me/edit/:profileId', component: EditAboutMeComponent },
    { path: ':username/experience/add/:profileId', component: NewExperienceComponent },
    { path: ':username/experience/edit/:experienceId/:profileId', component: EditExperienceComponent },
    { path: ':username/experience/delete/:experienceId', component: DeleteExperienceComponent },
    { path: ':username/education/add/:profileId', component: NewEducationComponent },
    { path: ':username/education/edit/:educationId/:profileId', component: EditEducationComponent },
    { path: ':username/education/delete/:educationId', component: DeleteEducationComponent },
    { path: ':username/project/add/:profileId', component: NewProjectComponent },
    { path: ':username/project/edit/:projectId/:profileId', component: EditProjectComponent },
    { path: ':username/project/delete/:projectId', component: DeleteProjectComponent },
    { path: ':username/skill/list', component: ListSkillComponent },
    { path: ':username/skill/add', component: NewSkillComponent },
    { path: ':username/skill/delete/:userSkillsId', component: DeleteSkillComponent },
]

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AuthModule,
        MainModule
    ],
    providers: [
        AboutMeService,
        BannerService,
        ConfigurationService,
        DescriptionService,
        EducationService,
        ExperienceService,
        PhotoService,
        ProfileService,
        ProjectService,
        SocialMediaService,
        SkillService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
