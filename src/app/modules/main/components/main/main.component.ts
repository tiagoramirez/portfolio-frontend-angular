import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IProfile } from 'src/app/models/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

    ngOnInit(): void {

        this.username = this.route.snapshot.params['username'];


        let sub: Subscription = this.profileService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.profiles = data;
                this.selectedProfile = data[0];
            },
            error: (e) => {
                this.loading = false;
                this.error = true;
                console.log(e);
            },
            complete: () => {
                this.loading = false;
                this.error = false;
                this.subsContainer.add(sub);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    username: string;
    selectedProfile: IProfile;
    profiles: IProfile[] = [];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    error: boolean = false;
}