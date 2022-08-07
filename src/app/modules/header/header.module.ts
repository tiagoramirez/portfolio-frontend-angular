import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ListSocialMediaComponent } from './components/list-social-media/list-social-media.component';
import { HandleSocialMediaComponent } from './components/handle-social-media/handle-social-media.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HeaderComponent,
        ListSocialMediaComponent,
        HandleSocialMediaComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        ListSocialMediaComponent,
        HandleSocialMediaComponent
    ]
})
export class HeaderModule { }
