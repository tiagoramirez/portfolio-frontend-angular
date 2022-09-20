import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IAboutMe } from 'src/app/models/about_me.interface'
import { AboutMeService } from 'src/app/services/about-me.service'

@Component({
    selector: 'app-edit-about-me',
    templateUrl: './edit-about-me.component.html',
    styleUrls: ['./edit-about-me.component.css']
})
export class EditAboutMeComponent implements OnInit, OnDestroy {
    constructor (private readonly route: ActivatedRoute, private readonly aboutMeService: AboutMeService, private readonly router: Router) { }

    ngOnInit (): void {
        this.username = this.route.snapshot.params['username']
        this.profileId = this.route.snapshot.params['profileId']
        const sub = this.aboutMeService.getByProfileId(this.profileId).subscribe({
            next: (data) => {
                this.about_me = data
                this.about_me.profileId = this.profileId
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

    ngOnDestroy (): void {
        this.subsContainer.unsubscribeAll()
    }

    save (): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const sub = this.aboutMeService.edit(this.about_me).subscribe({
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

    username: string
    about_me: IAboutMe
    profileId: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
