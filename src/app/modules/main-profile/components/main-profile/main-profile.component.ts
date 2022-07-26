import { Component, Input, OnInit } from '@angular/core';
import { ILocation } from 'src/app/models/location.interface';
import { IPerson } from 'src/app/models/person.interface';

@Component({
    selector: 'app-main-profile',
    templateUrl: './main-profile.component.html',
    styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent {

    @Input() person: IPerson;
    @Input() location: ILocation;
}
