import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectComponent } from './components/project/project.component'
import { NewProjectComponent } from './components/new-project/new-project.component'
import { EditProjectComponent } from './components/edit-project/edit-project.component'
import { DeleteProjectComponent } from './components/delete-project/delete-project.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        ProjectComponent,
        NewProjectComponent,
        EditProjectComponent,
        DeleteProjectComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        ProjectComponent,
        NewProjectComponent,
        EditProjectComponent,
        DeleteProjectComponent
    ]
})
export class ProjectModule { }
