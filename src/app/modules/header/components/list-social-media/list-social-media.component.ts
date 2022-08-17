import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUserSocialMedia } from 'src/app/models/social_media.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
    selector: 'app-list-social-media',
    templateUrl: './list-social-media.component.html',
    styleUrls: ['./list-social-media.component.css']
})
export class ListSocialMediaComponent implements OnInit, OnDestroy {

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
