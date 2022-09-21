import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPhotoComponent } from './components/edit-photo/edit-photo.component';
import { RouterModule } from '@angular/router';
import { EditBannerComponent } from './components/edit-banner/edit-banner.component';



@NgModule({
    declarations: [
        EditPhotoComponent,
        EditBannerComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [

    ]
})
export class ImgHandlerModule { }
