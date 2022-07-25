import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SocialMediaService } from './services/social-media.service';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        SocialMediaService
    ]
})
export class HeaderModule { }
