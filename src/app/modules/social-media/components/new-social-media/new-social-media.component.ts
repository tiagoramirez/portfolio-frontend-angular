import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { checkProtocolURL } from 'src/app/helpers/checkProtocolURL'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { ISocialMedia, IUserSocialMedia } from 'src/app/models/social_media.interface'
import { SocialMediaService } from 'src/app/services/social-media.service'

@Component({
    selector: 'app-new-social-media',
    templateUrl: './new-social-media.component.html',
    styleUrls: ['./new-social-media.component.css']
})
export class NewSocialMediaComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly tokenService: TokenService, private readonly socialMediaService: SocialMediaService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        const subSocialMedia = this.socialMediaService.getAll().subscribe({
            next: (data) => {
                this.all_social_media = data
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessage = err.error.message
                } else {
                    this.errorMessage = AppSettings.serverErrorMessage
                }
                this.isError = true
                this.loading = false
            },
            complete: () => {
                this.loading = false
                this.subsContainer.add(subSocialMedia)
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    onSave(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const errorNumber = this.socialMediaService.check(this.user_social_media)
        if (errorNumber != 0) {
            this.isErrorLoadingNewData = true
            this.loadingNewData = false
            this.errorMessageLoadingNewData = this.socialMediaService.getErrorMessage(errorNumber)
        }
        else {
            this.user_social_media.link = checkProtocolURL(this.user_social_media.link)
            const sub = this.socialMediaService.addNew(this.user_social_media).subscribe({
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

    }

    username: string
    profileId: number
    all_social_media: ISocialMedia[]
    user_social_media: IUserSocialMedia = {
        userId: this.tokenService.getUserId(),
        id_social_media: undefined,
        link: ''
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
