import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HeaderModule } from '../header/header.module';
import { ProfileModule } from '../profile/profile.module';
import { FirstTimeConfigModule } from '../first-time-config/first-time-config.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        HeaderModule,
        ProfileModule,
        FirstTimeConfigModule
    ]
})
export class MainModule { }
