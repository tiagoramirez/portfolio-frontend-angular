import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';
import { SocialMediaService } from '../../services/social-media.service';

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

    socialMedia: IMySocialMedia[] = [];

    loading: boolean = true;
    error: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
