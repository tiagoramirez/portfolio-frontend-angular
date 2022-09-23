import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { ISkill, IUserSkills } from 'src/app/models/skill.interface'
import { SkillService } from 'src/app/services/skill.service'

@Component({
    selector: 'app-new-skill',
    templateUrl: './new-skill.component.html',
    styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly skillService: SkillService, private readonly router: Router, private readonly tokenService: TokenService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        const sub: Subscription = this.skillService.getAll().subscribe({
            next: (data) => {
                this.all_skills = data
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

    onSubmit(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const sub = this.skillService.addNew(this.user_skill).subscribe({
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
    all_skills: ISkill[]
    user_skill: IUserSkills = {
        userId: this.tokenService.getUserId(),
        id_skill: 0,
        percentage: 0
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
