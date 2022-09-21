import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppSettings } from 'src/app/helpers/appSettings';
import { getBase64 } from 'src/app/helpers/getBase64';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { BannerService } from 'src/app/services/banner.service';

@Component({
    selector: 'app-edit-banner',
    templateUrl: './edit-banner.component.html',
    styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit, OnDestroy {

    constructor(private readonly route: ActivatedRoute, private readonly bannerService: BannerService, private readonly router: Router, private readonly tokenService: TokenService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        const sub: Subscription = this.bannerService.getByUsername(this.username).subscribe({
            next: (data) => {
                if (data === null || data === undefined) {
                    this.photoLoaded = false
                    this.isFirstPhoto = true
                } else {
                    this.photoLoaded = true
                    this.isFirstPhoto = false
                    this.photoId = data.id
                    this.photoString = 'data:image/jpeg;base64,' + data.banner
                }
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessage = err.error.message
                } else {
                    this.errorMessage = AppSettings.serverErrorMessageSection
                }
                this.isError = true
                this.loading = false
            },
            complete: () => {
                this.loading = false
                this.subsContainer.add(sub)
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    loadImg(event: any): void {
        this.photoFile = event.target.files[0] as File
        void getBase64(this.photoFile).then((res: any) => this.photoString = res.base)
        this.photoLoaded = true
        this.isPhotoSelected = true
    }

    saveImg(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        if (this.photoFile !== undefined && this.photoFile !== null) {
            if (this.isFirstPhoto) {
                const sub: Subscription = this.bannerService.addNew(this.photoFile, this.tokenService.getUserId()).subscribe({
                    error: (err) => {
                        if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                            this.errorMessageLoadingNewData = err.error.message
                        } else {
                            this.errorMessageLoadingNewData = AppSettings.serverErrorMessage
                        }
                        this.isErrorLoadingNewData = true
                        this.loadingNewData = false
                    },
                    complete: () => {
                        this.loadingNewData = false
                        this.subsContainer.add(sub)
                        void this.router.navigate(['/' + this.username])
                    }
                })
            } else {
                const sub: Subscription = this.bannerService.edit(this.photoFile, this.tokenService.getUserId(), this.photoId).subscribe({
                    error: (err) => {
                        if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                            this.errorMessageLoadingNewData = err.error.message
                        } else {
                            this.errorMessageLoadingNewData = AppSettings.serverErrorMessage
                        }
                        this.isErrorLoadingNewData = true
                        this.loadingNewData = false
                    },
                    complete: () => {
                        this.loadingNewData = false
                        this.subsContainer.add(sub)
                        void this.router.navigate(['/' + this.username])
                    }
                })
            }
        } else {
            this.isErrorLoadingNewData = true
            this.errorMessage = AppSettings.noImgLoaded
        }
    }

    type: string
    username: string
    photoString: string
    photoFile: File
    photoId: number
    userId: number
    isFirstPhoto: boolean
    photoLoaded: boolean = false
    isPhotoSelected: boolean = false

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false

}
