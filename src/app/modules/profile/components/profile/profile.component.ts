import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/auth/models/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IBanner } from 'src/app/models/banner.interface';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IPhoto } from 'src/app/models/photo.interface';
import { IProfile } from 'src/app/models/profile.interface';
import { BannerService } from 'src/app/services/banner.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private authService: AuthService, private tokenService: TokenService, private configurationService: ConfigurationService, private photoService: PhotoService, private bannerService: BannerService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];

        if (this.tokenService.getToken()) {
            this.loggedUsername = this.tokenService.getUsername();
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }

        let subUser: Subscription = this.authService.getUserByUsername(this.username).subscribe({
            next: (data) => {
                this.user = data;
            },
            error: (e) => {
                this.loadingUser = false;
                this.error = true;
                console.log(e);
            },
            complete: () => {
                this.loadingUser = false;
                this.error = false;
                this.subsContainer.add(subUser);
            }
        });

        let subConfiguration: Subscription = this.configurationService.getByProfileId(this.profile.id).subscribe({
            next: (data) => {
                this.configuration = data;
            },
            error: (e) => {
                this.loadingConfiguration = false;
                this.error = true;
                console.log(e);
            },
            complete: () => {
                this.loadingConfiguration = false;
                this.error = false;
                this.subsContainer.add(subConfiguration);
                if (this.configuration.show_photo) {
                    let subPhoto: Subscription = this.photoService.getByUsername(this.username).subscribe({
                        next: (data) => {
                            if (data === null || data === undefined) {
                                this.isPhotoNull = true;
                            }
                            else {
                                this.isPhotoNull = false;
                                this.photoString = 'data:image/jpeg;base64,' + data.photo;
                            }
                        },
                        error: (e) => {
                            this.error = true;
                            this.loadingPhoto = false;
                            console.error(e);
                        },
                        complete: () => {
                            this.loadingPhoto = false;
                            this.subsContainer.add(subPhoto);
                        }
                    });
                }
                if (this.configuration.show_banner) {
                    let subBanner: Subscription = this.bannerService.getByUsername(this.username).subscribe({
                        next: (data) => {
                            if (data === null || data === undefined) {
                                this.isBannerNull = true;
                            }
                            else {
                                this.isBannerNull = false;
                                this.bannerString = 'data:image/jpeg;base64,' + data.banner;
                            }
                        },
                        error: (e) => {
                            this.error = true;
                            this.loadingBanner = false;
                            console.error(e);
                        },
                        complete: () => {
                            this.loadingBanner = false;
                            this.subsContainer.add(subBanner);
                        }
                    });
                }
                if (!this.configuration.show_photo && !this.configuration.show_banner) {
                    this.loadingBanner = false;
                    this.loadingPhoto = false;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    username: string;
    user: IUser;
    configuration: IConfiguration;
    @Input() profile: IProfile;
    showModal = false;
    photoString: string;
    bannerString: string;
    loggedUsername: string = "";

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingConfiguration: boolean = true;
    loadingPhoto: boolean = true;
    isPhotoNull: boolean = true;
    loadingBanner: boolean = true;
    isBannerNull: boolean = true;
    loadingUser: boolean = true;
    error: boolean = false;
    isLogged: boolean = false;
}