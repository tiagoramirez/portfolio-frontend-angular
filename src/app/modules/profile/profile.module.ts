import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ProfileComponent } from './components/profile/profile.component'
import { EditProfileComponent } from './components/edit-profile/edit-profile.component'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [
        ProfileComponent,
        EditProfileComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        ProfileComponent,
        EditProfileComponent,
    ]
})
export class ProfileModule { }
