import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstTimeConfigComponent } from './components/first-time-config/first-time-config.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        FirstTimeConfigComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        FirstTimeConfigComponent
    ]
})
export class FirstTimeConfigModule { }
