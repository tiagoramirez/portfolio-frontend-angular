import { Component, Input } from '@angular/core';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IPerson } from 'src/app/models/person.interface';

@Component({
    selector: 'app-main-profile',
    templateUrl: './main-profile.component.html',
    styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent {

    @Input() person: IPerson;
    @Input() configuration: IConfiguration;

    showModal = false;

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}
