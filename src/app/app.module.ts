import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditSocialMediaComponent } from './modules/header/components/edit-social-media/edit-social-media.component';
import { HeaderModule } from './modules/header/header.module';
import { MainComponent } from './modules/main/components/main/main.component';
import { MainModule } from './modules/main/main.module';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'redes-sociales/editar/:id', component: EditSocialMediaComponent }
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
