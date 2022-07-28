import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        MainProfileComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        MainProfileComponent
    ]
})
export class MainProfileModule { }
