import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from './services/person.service';
import { RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MainProfileComponent,
        EditProfileComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        MainProfileComponent,
        EditProfileComponent
    ],
    providers: [
        PersonService
    ]
})
export class MainProfileModule { }
