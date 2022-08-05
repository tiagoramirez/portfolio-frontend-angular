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
import { BannerService } from './services/banner.service';
import { ConfigurationService } from './services/configuration.service';
import { PhotoService } from './services/photo.service';
import { ProfileService } from './services/profile.service';
import { SocialMediaService } from './services/social-media.service';

const routes: Routes = [
    { path: '', component: UserListComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: ':username',component:MainComponent }
    // { path: 'redes-sociales/editar/:id', component: EditSocialMediaComponent },
    // { path: 'redes-sociales/editar/:action/:idPerson/:idSm', component: HandleSocialMediaComponent },
    // { path: 'perfil/editar/:id', component: EditProfileComponent },
    // { path: 'perfil/editar/:id/:type', component: EditPhotoComponent },
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
        BannerService,
        ConfigurationService,
        PhotoService,
        ProfileService,
        SocialMediaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
