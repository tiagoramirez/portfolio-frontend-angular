import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { checkProtocolURL } from 'src/app/helpers/checkProtocolURL'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IUserSocialMedia } from 'src/app/models/social_media.interface'
import { SocialMediaService } from 'src/app/services/social-media.service'

@Component({
    selector: 'app-edit-social-media',
    templateUrl: './edit-social-media.component.html',
    styleUrls: ['./edit-social-media.component.css']
})
export class EditSocialMediaComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly socialMediaService: SocialMediaService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.idSmToModify = this.route.snapshot.params['idSm']
        const sub = this.socialMediaService.getById(this.idSmToModify).subscribe({
            next: (data) => {
                this.social_media = data
                this.social_media.userId = this.tokenService.getUserId()
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
                this.subsContainer.add(sub)
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    save(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const errorNumber = this.socialMediaService.check(this.social_media)
        if (errorNumber != 0) {
            this.isErrorLoadingNewData = true
            this.loadingNewData = false
            this.errorMessageLoadingNewData = this.socialMediaService.getErrorMessage(errorNumber)
        }
        else {
            this.social_media.link = checkProtocolURL(this.social_media.link)
            const subExperience = this.socialMediaService.edit(this.social_media).subscribe({
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
                    this.subsContainer.add(subExperience)
                    void this.router.navigate(['/' + this.username])
                }
            })
        }
    }

    username: string
    idSmToModify: number
    social_media: IUserSocialMedia

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
