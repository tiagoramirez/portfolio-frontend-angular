import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { RouterModule } from '@angular/router';
import { EditAboutMeComponent } from './components/edit-about-me/edit-about-me.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AboutMeComponent,
        EditAboutMeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        AboutMeComponent,
        EditAboutMeComponent
    ]
})
export class AboutMeModule { }
