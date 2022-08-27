import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './components/education/education.component';
import { FormsModule } from '@angular/forms';
import { NewEducationComponent } from './components/new-education/new-education.component';
import { EditEducationComponent } from './components/edit-education/edit-education.component';
import { DeleteEducationComponent } from './components/delete-education/delete-education.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        EducationComponent,
        NewEducationComponent,
        EditEducationComponent,
        DeleteEducationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        EducationComponent,
        NewEducationComponent,
        EditEducationComponent,
        DeleteEducationComponent
    ]
})
export class EducationModule { }
