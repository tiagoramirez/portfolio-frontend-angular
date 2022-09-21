import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IAboutMe } from 'src/app/models/about_me.interface'
import { IProfile } from 'src/app/models/profile.interface'
import { AboutMeService } from 'src/app/services/about-me.service'

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, OnDestroy {
    constructor(private readonly aboutMeService: AboutMeService, private readonly tokenService: TokenService, private readonly route: ActivatedRoute) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        if (this.tokenService.getToken() != null) {
            this.loggedUsername = this.tokenService.getUsername()
            this.isLogged = true
        } else {
            this.isLogged = false
        }
        const sub: Subscription = this.aboutMeService.getByProfileId(this.profile.id).subscribe({
            next: (data) => {
                this.aboutMe = data
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

    @Input() profile: IProfile
    aboutMe: IAboutMe
    username: string
    loggedUsername: string = ''
    isLogged: boolean = false

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false
}
