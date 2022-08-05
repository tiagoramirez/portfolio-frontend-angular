import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { EditSocialMediaComponent } from './components/edit-social-media/edit-social-media.component';
import { HandleSocialMediaComponent } from './components/handle-social-media/handle-social-media.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HeaderComponent,
        EditSocialMediaComponent,
        HandleSocialMediaComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        EditSocialMediaComponent,
        HandleSocialMediaComponent
    ]
})
export class HeaderModule { }
