import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        HeaderModule
    ]
})
export class MainModule { }
