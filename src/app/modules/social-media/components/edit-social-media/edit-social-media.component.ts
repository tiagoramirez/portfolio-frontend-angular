import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppSettings } from 'src/app/helpers/appSettings';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUserSocialMedia } from 'src/app/models/social_media.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
    selector: 'app-edit-social-media',
    templateUrl: './edit-social-media.component.html',
    styleUrls: ['./edit-social-media.component.css']
})
export class EditSocialMediaComponent implements OnInit {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private socialMediaService:SocialMediaService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.idSmToModify = this.route.snapshot.params['idSm'];
        let sub = this.socialMediaService.getById(this.idSmToModify).subscribe({
            next: (data) => {
                this.social_media = data;
                this.social_media.userId = this.tokenService.getUserId();
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = AppSettings.serverErrorMessage;
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

    save() {
        this.isErrorLoadingNewData = false;
        this.loadingNewData = true;
        let subExperience = this.socialMediaService.edit(this.social_media).subscribe({
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessageLoadingNewData = err.error.message;
                }
                else {
                    this.errorMessageLoadingNewData = AppSettings.serverErrorMessage;
                }
                this.isErrorLoadingNewData = true;
                this.loadingNewData = false;
            },
            complete: () => {
                this.loadingNewData=false;
                this.subsContainer.add(subExperience);
                this.router.navigate(['/' + this.username]);
            }
        });
    }

    username: string;
    idSmToModify:number;
    social_media: IUserSocialMedia;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    errorMessage: string = '';
    isError: boolean = false;

    loadingNewData: boolean = false;
    errorMessageLoadingNewData: string = '';
    isErrorLoadingNewData: boolean = false;
}
