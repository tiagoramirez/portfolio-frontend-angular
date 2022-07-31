import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditSocialMediaComponent } from './modules/header/components/edit-social-media/edit-social-media.component';
import { HandleSocialMediaComponent } from './modules/header/components/handle-social-media/handle-social-media.component';
import { HeaderModule } from './modules/header/header.module';
import { EditProfileComponent } from './modules/main-profile/components/edit-profile/edit-profile.component';
import { EditPhotoComponent } from './modules/main-profile/components/edit-photo/edit-photo.component';
import { MainComponent } from './modules/main/components/main/main.component';
import { MainModule } from './modules/main/main.module';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'redes-sociales/editar/:id', component: EditSocialMediaComponent },
    { path: 'redes-sociales/editar/:action/:idPerson/:idSm', component: HandleSocialMediaComponent },
    { path: 'perfil/editar/:id', component: EditProfileComponent },
    { path: 'perfil/editar/:id/:type', component: EditPhotoComponent },
]

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        MainModule,
        HeaderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
