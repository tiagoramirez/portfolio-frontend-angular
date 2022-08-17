import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IAboutMe } from 'src/app/models/about_me.interface';
import { IProfile } from 'src/app/models/profile.interface';
import { AboutMeService } from 'src/app/services/about-me.service';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy {

    constructor(private aboutMeService: AboutMeService) { }

    ngOnInit(): void {
        this.profile = this.profiles[0];

        let sub: Subscription = this.aboutMeService.getByProfileId(this.profile.id).subscribe({
            next: (data) => {
                this.aboutMe = data;
            },
            error: (err) => {
                this.loading = false;
                console.error(err);
            },
            complete: () => {
                this.loading = false;
                this.subsContainer.add(sub);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    profile: IProfile;
    @Input() profiles: IProfile[];
    aboutMe: IAboutMe;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
}
