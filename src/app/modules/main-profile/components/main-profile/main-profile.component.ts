import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { ILocation } from 'src/app/models/location.interface';
import { IPerson } from 'src/app/models/person.interface';
import { LocationService } from '../../services/location.service';

@Component({
    selector: 'app-main-profile',
    templateUrl: './main-profile.component.html',
    styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent implements OnInit, OnDestroy {
    constructor(private locationService: LocationService) { }

    ngOnInit(): void {
        let sub: Subscription = this.locationService.getByPersonId(this.person.id).subscribe({
            next: (v) => {
                if (v !== undefined && v !== null) {
                    this.location = v;
                }
                else {
                    this.locationNull = true;
                }
                this.loading = false;
            },
            error: (e) => {
                this.error = true;
                console.error(e);
                this.loading = false;
            },
            complete: () => {
                this.subsContainer.add(sub);
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    @Input() person: IPerson;
    @Input() configuration: IConfiguration;

    location: ILocation;
    loading: boolean = true;
    locationNull: boolean = false;
    error: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    showModal = false;

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}
