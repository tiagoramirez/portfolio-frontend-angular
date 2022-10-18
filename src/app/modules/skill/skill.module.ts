import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgCircleProgressModule } from 'ng-circle-progress'
import { SkillComponent } from './components/skill/skill.component'
import { ListSkillComponent } from './components/list-skill/list-skill.component'
import { RouterModule } from '@angular/router'
import { NewSkillComponent } from './components/new-skill/new-skill.component'
import { DeleteSkillComponent } from './components/delete-skill/delete-skill.component'
import { FormsModule } from '@angular/forms';
import { EditSkillComponent } from './components/edit-skill/edit-skill.component'

@NgModule({
    declarations: [
        SkillComponent,
        ListSkillComponent,
        NewSkillComponent,
        DeleteSkillComponent,
        EditSkillComponent
    ],
    imports: [
        CommonModule,
        NgCircleProgressModule.forRoot({
            radius: 80,
            animation: true,
            animationDuration: 500,
            outerStrokeWidth: 4,
            innerStrokeWidth: 2,
            outerStrokeColor: '#66fcf1',
            innerStrokeColor: '#45A29E',
            titleColor: '#c5c6c7',
            titleFontSize: '1.2rem',
            subtitleColor: '#858585',
            subtitleFontSize: '1.1rem',
            showUnits: false,
            lazy: true
        }),
        RouterModule,
        FormsModule
    ],
    exports: [
        SkillComponent,
        ListSkillComponent,
        NewSkillComponent,
        EditSkillComponent,
        DeleteSkillComponent
    ]
})
export class SkillModule { }
