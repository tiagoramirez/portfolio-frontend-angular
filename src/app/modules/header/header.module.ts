import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SocialMediaService } from './services/social-media.service';
import { HttpClientModule } from "@angular/common/http";
import { EditSocialMediaComponent } from './components/edit-social-media/edit-social-media.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        EditSocialMediaComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        SocialMediaService
    ]
})
export class HeaderModule { }
