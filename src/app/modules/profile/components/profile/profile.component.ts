import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/auth/models/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
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

    constructor(private route: ActivatedRoute, private authService: AuthService, private configurationService: ConfigurationService, private photoService: PhotoService, private bannerService: BannerService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.profile = this.profiles[0];

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
                        next: (p) => {
                            this.photoString = 'data:image/jpeg;base64,' + p.photo;
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
                        next: (b) => {
                            this.bannerString = 'data:image/jpeg;base64,' + b.banner;
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
    profile: IProfile;
    showModal = false;
    photoString: string;
    bannerString: string;

    @Input() profiles: IProfile[];

    loadingPhoto: boolean = true;
    loadingBanner: boolean = true;
    loadingConfiguration: boolean = true;
    loadingUser: boolean = true;

    error: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
