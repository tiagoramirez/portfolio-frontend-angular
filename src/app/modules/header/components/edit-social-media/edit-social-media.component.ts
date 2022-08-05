import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUserSocialMedia } from 'src/app/models/user_social_media.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
    selector: 'app-edit-social-media',
    templateUrl: './edit-social-media.component.html',
    styleUrls: ['./edit-social-media.component.css']
})
export class EditSocialMediaComponent implements OnInit, OnDestroy {

    constructor(private socialMediaService: SocialMediaService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.personId = this.route.snapshot.params['id'];

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

    personId: number;

    socialMedia: IUserSocialMedia[] = [];

    loading: boolean = true;
    error: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
