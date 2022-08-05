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
        this.username = this.route.snapshot.params['username'];
        
        let sub: Subscription = this.socialMediaService.getAllByUsername(this.username).subscribe({
            next: (data) => {
                this.socialMedia = data;
            },
            error: (e) => {
                this.loading = false;
                this.error = true;
                console.error(e);
            },
            complete: () => {
                this.loading = false;
                this.error = false;
                this.subsContainer.add(sub);
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    username: string;
    socialMedia: IUserSocialMedia[] = [];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
    
    loading: boolean = true;
    error: boolean = false;
}
