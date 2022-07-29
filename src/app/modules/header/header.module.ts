import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SocialMediaService } from './services/social-media.service';
import { HttpClientModule } from "@angular/common/http";
import { EditSocialMediaComponent } from './components/edit-social-media/edit-social-media.component';
import { RouterModule } from '@angular/router';
import { HandleSocialMediaComponent } from './components/handle-social-media/handle-social-media.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HeaderComponent,
        EditSocialMediaComponent,
        HandleSocialMediaComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        EditSocialMediaComponent,
        HandleSocialMediaComponent
    ],
    providers: [
        SocialMediaService
    ]
})
export class HeaderModule { }
