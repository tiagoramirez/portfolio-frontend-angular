import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';
import { SocialMediaService } from '../../services/social-media.service';

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

    socialMedia: IMySocialMedia[];

    loading: boolean = true;
    error: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
