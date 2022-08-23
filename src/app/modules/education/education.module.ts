import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './components/education/education.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EducationComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        EducationComponent
    ]
})
export class EducationModule { }
