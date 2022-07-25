import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './components/experience/experience.component';



@NgModule({
    declarations: [
        ExperienceComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ExperienceComponent
    ]
})
export class ExperienceModule { }
