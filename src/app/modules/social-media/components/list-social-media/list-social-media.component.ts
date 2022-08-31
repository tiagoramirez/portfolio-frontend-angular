import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppSettings } from 'src/app/helpers/appSettings';
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
                this.isEmpty = this.socialMedia.length == 0;
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = AppSettings.serverErrorMessageSection;
                }
                this.isError = true;
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
                this.subsContainer.add(sub);
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    username: string;
    socialMedia: IUserSocialMedia[] = [];
    isEmpty: boolean;
    emptyMessage: string = AppSettings.emptyListMessage('redes sociales');

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    errorMessage: string = '';
    isError: boolean = false;
}
