import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IUserSkills } from 'src/app/models/skill.interface'
import { SkillService } from 'src/app/services/skill.service'

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly skillService: SkillService, private readonly tokenService: TokenService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        if (this.tokenService.getToken() != null) {
            this.loggedUsername = this.tokenService.getUsername()
            this.isLogged = true
        } else {
            this.isLogged = false
        }

        const sub: Subscription = this.skillService.getAllByUsername(this.username).subscribe({
            next: (data) => {
                this.skills = data
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

    username: string
    loggedUsername: string = ''
    isLogged = false
    skills: IUserSkills[] = []

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false
}
