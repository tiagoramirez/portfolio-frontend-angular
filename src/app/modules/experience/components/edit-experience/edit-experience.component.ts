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
    selector: 'app-edit-experience',
    templateUrl: './edit-experience.component.html',
    styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly experienceService: ExperienceService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.experienceId = this.route.snapshot.params['experienceId']
        this.profileId = this.route.snapshot.params['profileId']
        const subExp = this.experienceService.getById(this.experienceId).subscribe({
            next: (data) => {
                this.experience = data
                this.experience.userId = this.tokenService.getUserId()
                if (!data.isActual) {
                    const endDate = new Date(data.end_date);
                    this.endDay = endDate.getDay()
                    this.endMonth = endDate.getMonth() + 1
                    this.endYear = endDate.getFullYear()
                }
                const startDate = new Date(data.start_date);
                this.startDay = startDate.getDay()
                this.startMonth = startDate.getMonth() + 1
                this.startYear = startDate.getFullYear()
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessage = err.error.message
                } else {
                    this.errorMessage = AppSettings.serverErrorMessage
                }
                this.isError = true
                this.loadingExperience = false
            },
            complete: () => {
                this.loadingExperience = false
                this.subsContainer.add(subExp)
            }
        })
        const subDesc = this.descriptionService.getByProfileAndExperienceId(this.profileId, this.experienceId).subscribe({
            next: (data) => {
                this.description = data
                this.description.profileId = this.profileId
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessage = err.error.message
                } else {
                    this.errorMessage = AppSettings.serverErrorMessage
                }
                this.isError = true
                this.loadingDescription = false
            },
            complete: () => {
                this.loadingDescription = false
                this.subsContainer.add(subDesc)
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    save(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        this.experience.start_date = new Date(this.startYear, (this.startMonth - 1), this.startDay)
        this.experience.end_date = new Date(this.endYear, (this.endMonth - 1), this.endDay)
        const subExperience = this.experienceService.edit(this.experience).subscribe({
            next: () => {
                const subDescription = this.descriptionService.edit(this.description).subscribe({
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
    experienceId: number
    profileId: number
    experience: IExperience
    description: IDescription

    actualYear: number = new Date().getFullYear()
    startDay: number
    startMonth: number
    startYear: number
    endDay: number
    endMonth: number
    endYear: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingDescription: boolean = true
    loadingExperience: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
