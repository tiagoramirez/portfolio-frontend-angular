import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstTimeConfigComponent } from './components/first-time-config/first-time-config.component';

@NgModule({
    declarations: [
        FirstTimeConfigComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FirstTimeConfigComponent
    ]
})
export class FirstTimeConfigModule { }
