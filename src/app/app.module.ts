import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { UserListComponent } from './auth/components/user-list/user-list.component';
import { FirstTimeConfigComponent } from './modules/first-time-config/components/first-time-config/first-time-config.component';
import { ListSocialMediaComponent } from './modules/header/components/list-social-media/list-social-media.component';
import { HandleSocialMediaComponent } from './modules/header/components/handle-social-media/handle-social-media.component';
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

const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: ':username', component: MainComponent },
    { path: ':username/first-time-config', component: FirstTimeConfigComponent },
    { path: ':username/social-media/edit', component: ListSocialMediaComponent },
    { path: ':username/social-media/edit/:action/:idSm', component: HandleSocialMediaComponent },
    { path: ':username/profile/edit/:profileId', component: EditProfileComponent },
    { path: ':username/profile/edit/img/:type', component: EditPhotoComponent },
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
        ExperienceService,
        PhotoService,
        ProfileService,
        SocialMediaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
