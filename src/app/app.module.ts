import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { MainComponent } from './modules/main/components/main/main.component';
import { MainModule } from './modules/main/main.module';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
    // { path: 'redes-sociales/editar/:id', component: EditSocialMediaComponent },
    // { path: 'redes-sociales/editar/:action/:idPerson/:idSm', component: HandleSocialMediaComponent },
    // { path: 'perfil/editar/:id', component: EditProfileComponent },
    // { path: 'perfil/editar/:id/:type', component: EditPhotoComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        MainModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
