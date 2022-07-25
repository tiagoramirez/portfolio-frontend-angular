import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './components/education/education.component';



@NgModule({
    declarations: [
        EducationComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        EducationComponent
    ]
})
export class EducationModule { }
