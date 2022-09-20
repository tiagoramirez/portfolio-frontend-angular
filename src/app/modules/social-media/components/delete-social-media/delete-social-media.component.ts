import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { SocialMediaService } from 'src/app/services/social-media.service'

@Component({
    selector: 'app-delete-social-media',
    templateUrl: './delete-social-media.component.html',
    styleUrls: ['./delete-social-media.component.css']
})
export class DeleteSocialMediaComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly socialMediaService: SocialMediaService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.socialMediaId = this.route.snapshot.params['idSm']
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    delete(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const sub = this.socialMediaService.delete(this.socialMediaId).subscribe({
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
                void this.router.navigate(['/' + this.username + '/social-media/list'])
            }
        })
    }

    username: string
    socialMediaId: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
