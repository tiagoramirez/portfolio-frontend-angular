import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IProfile } from 'src/app/models/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private router: Router, private profileService: ProfileService) { }

    ngOnInit(): void {

        this.username = this.route.snapshot.params['username'];


        let sub: Subscription = this.profileService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.profiles = data;
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
    profiles: IProfile[] = [];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    error: boolean = false;
}