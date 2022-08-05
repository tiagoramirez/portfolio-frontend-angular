import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class MainModule { }
