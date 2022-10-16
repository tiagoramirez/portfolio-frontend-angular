import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IDescription } from 'src/app/models/description.interface'
import { IExperience } from 'src/app/models/experience.interface'
import { DescriptionService } from 'src/app/services/description.service'
import { ExperienceService } from 'src/app/services/experience.service'

@Component({
    selector: 'app-new-experience',
    templateUrl: './new-experience.component.html',
    styleUrls: ['./new-experience.component.css']
})
export class NewExperienceComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly experienceService: ExperienceService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.profileId = this.route.snapshot.params['profileId']
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    save(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        this.experience.start_date = new Date(this.startYear, (this.startMonth - 1), this.startDay)
        this.experience.end_date = new Date(this.endYear, (this.endMonth - 1), this.endDay)
        const subExperience = this.experienceService.addNew(this.experience).subscribe({
            next: (data) => {
                this.description.profileId = this.profileId
                this.description.experienceId = data.id
                const subDescription = this.descriptionService.addNew(this.description).subscribe({
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
                        this.subsContainer.add(subDescription)
                        void this.router.navigate(['/' + this.username])
                    }
                })
            },
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
                this.subsContainer.add(subExperience)
            }
        })
    }

    username: string
    profileId: number
    experience: IExperience = {
        userId: this.tokenService.getUserId(),
        position: '',
        type: '',
        company_name: '',
        location: '',
        isActual: false,
        start_date: undefined,
        end_date: undefined
    }

    description: IDescription = {
        profileId: 0,
        experienceId: 0,
        description: ''
    }

    actualYear: number = new Date().getFullYear()
    startDay: number
    startMonth: number
    startYear: number
    endDay: number
    endMonth: number
    endYear: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
