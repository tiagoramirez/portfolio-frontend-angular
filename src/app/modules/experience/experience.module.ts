import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './components/experience/experience.component';
import { RouterModule } from '@angular/router';
import { NewExperienceComponent } from './components/new-experience/new-experience.component';
import { FormsModule } from '@angular/forms';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';
import { DeleteExperienceComponent } from './components/delete-experience/delete-experience.component';



@NgModule({
    declarations: [
        ExperienceComponent,
        NewExperienceComponent,
        EditExperienceComponent,
        DeleteExperienceComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        ExperienceComponent,
        NewExperienceComponent,
        EditExperienceComponent,
        DeleteExperienceComponent
    ]
})
export class ExperienceModule { }
