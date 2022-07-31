import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IPerson } from 'src/app/models/person.interface';
import { BannerService } from '../../services/banner.service';
import { PhotoService } from '../../services/photo.service';

@Component({
    selector: 'app-main-profile',
    templateUrl: './main-profile.component.html',
    styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent implements OnInit, OnDestroy {

    constructor(private photoService: PhotoService, private bannerService: BannerService) { }

    ngOnInit(): void {
        if (this.configuration.show_photo) {
            let subPhoto: Subscription = this.photoService.getById(this.person.id_photo).subscribe({
                next: (p) => {
                    this.photoString = 'data:image/jpeg;base64,' + p.photo;
                    this.loadingPhoto = false;
                },
                error: (e) => {
                    console.error(e);
                    this.loadingPhoto = false;
                },
                complete: () => {
                    this.subsContainer.add(subPhoto);
                }
            });
        }
        if (this.configuration.show_banner) {
            let subBanner: Subscription = this.bannerService.getById(this.person.id_banner).subscribe({
                next: (b) => {
                    this.bannerString = 'data:image/jpeg;base64,' + b.banner;
                    this.loadingBanner = false;
                },
                error: (e) => {
                    console.error(e);
                    this.loadingBanner = false;
                },
                complete: () => {
                    this.subsContainer.add(subBanner);
                }
            });
        }
        if (!this.configuration.show_photo && !this.configuration.show_banner) {
            this.loadingBanner = false;
            this.loadingPhoto = false;
        }
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    @Input() person: IPerson;
    @Input() configuration: IConfiguration;

    showModal = false;

    photoString: string;
    bannerString: string;

    loadingPhoto: boolean = true;
    loadingBanner: boolean = true;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    openModal() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }
}
