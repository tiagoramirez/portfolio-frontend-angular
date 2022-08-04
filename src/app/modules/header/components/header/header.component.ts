import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUserSocialMedia } from 'src/app/models/user_social_media.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    constructor(private socialMediaService: SocialMediaService) { }

    ngOnInit(): void {
        let sub: Subscription = this.socialMediaService.getAllByPersonId(this.personId).subscribe({
            next: (v) => {
                this.socialMedia = v;
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

    @Input() personId: number;

    socialMedia: IUserSocialMedia[];

    loading: boolean = true;
    error: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
