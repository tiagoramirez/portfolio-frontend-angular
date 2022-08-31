import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSocialMediaComponent } from './components/list-social-media/list-social-media.component';
import { HandleSocialMediaComponent } from './components/handle-social-media/handle-social-media.component';
import { NewSocialMediaComponent } from './components/new-social-media/new-social-media.component';
import { EditSocialMediaComponent } from './components/edit-social-media/edit-social-media.component';
import { DeleteSocialMediaComponent } from './components/delete-social-media/delete-social-media.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        ListSocialMediaComponent,
        HandleSocialMediaComponent,
        NewSocialMediaComponent,
        EditSocialMediaComponent,
        DeleteSocialMediaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports:[
        ListSocialMediaComponent,
        HandleSocialMediaComponent,
        NewSocialMediaComponent,
        EditSocialMediaComponent,
        DeleteSocialMediaComponent
    ]
})
export class SocialMediaModule { }
