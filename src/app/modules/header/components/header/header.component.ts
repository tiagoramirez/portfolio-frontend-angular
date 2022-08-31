import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppSettings } from 'src/app/helpers/appSettings';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUserSocialMedia } from 'src/app/models/social_media.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private socialMediaService: SocialMediaService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        if (this.tokenService.getToken()) {
            this.loggedUsername = this.tokenService.getUsername();
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }

        let sub: Subscription = this.socialMediaService.getAllByUsername(this.username).subscribe({
            next: (data) => {
                this.socialMedia = data;
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
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    onLogout() {
        this.tokenService.logOut();
        window.location.reload();
    }

    username: string;
    socialMedia: IUserSocialMedia[] = [];
    loggedUsername: string = "";

    isLogged = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    errorMessage: string = '';
    isError: boolean = false;
}
