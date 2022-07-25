import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileComponent } from './components/main-profile/main-profile.component';



@NgModule({
    declarations: [
        MainProfileComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MainProfileComponent
    ]
})
export class MainProfileModule { }
