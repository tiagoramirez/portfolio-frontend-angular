import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppSettings } from 'src/app/helpers/appSettings';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUserSkills } from 'src/app/models/skill.interface';
import { SkillService } from 'src/app/services/skill.service';

@Component({
    selector: 'app-edit-skill',
    templateUrl: './edit-skill.component.html',
    styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit, OnDestroy {

    constructor(private readonly route: ActivatedRoute, private readonly skillService: SkillService, private readonly tokenService: TokenService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        const userSkillsId = this.route.snapshot.params['userSkillsId']
        const sub = this.skillService.getById(userSkillsId).subscribe({
            next: (data) => {
                this.skill = data
                this.skill.userId = this.tokenService.getUserId()
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
        const sub = this.skillService.edit(this.skill).subscribe({
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
                void this.router.navigate([this.username])
            }
        })
    }

    username: string
    skill: IUserSkills

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
