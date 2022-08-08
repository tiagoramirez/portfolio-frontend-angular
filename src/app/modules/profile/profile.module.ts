import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RouterModule } from '@angular/router';
import { EditPhotoComponent } from './components/edit-photo/edit-photo.component';

@NgModule({
    declarations: [
        ProfileComponent,
        EditProfileComponent,
        EditPhotoComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        ProfileComponent,
        EditProfileComponent,
        EditPhotoComponent
    ]
})
export class ProfileModule { }
