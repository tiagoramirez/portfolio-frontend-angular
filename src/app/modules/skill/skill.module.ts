import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SkillComponent } from './components/skill/skill.component';

@NgModule({
    declarations: [
        SkillComponent
    ],
    imports: [
        CommonModule,
        NgCircleProgressModule.forRoot({
            radius: 100,
            animation: true,
            animationDuration: 400,
            outerStrokeWidth: 6,
            innerStrokeWidth: 2,
            outerStrokeColor: "#66fcf1",
            innerStrokeColor: "#45A29E",
            titleColor: '#c5c6c7',
            titleFontSize: '1.7rem',
            titleFontWeight: '700',
            subtitleColor: '#858585',
            subtitleFontSize: '1.1rem',
            lazy: true,
        }),
    ],
    exports: [
        SkillComponent
    ]
})
export class SkillModule { }
