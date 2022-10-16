import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IDescription } from 'src/app/models/description.interface'
import { IEducation } from 'src/app/models/education.interface'
import { DescriptionService } from 'src/app/services/description.service'
import { EducationService } from 'src/app/services/education.service'

@Component({
    selector: 'app-edit-education',
    templateUrl: './edit-education.component.html',
    styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly educationService: EducationService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.educationId = this.route.snapshot.params['educationId']
        this.profileId = this.route.snapshot.params['profileId']
        const subEduc = this.educationService.getById(this.educationId).subscribe({
            next: (data) => {
                this.education = data
                this.education.userId = this.tokenService.getUserId()
                const startDate = new Date(data.start_date)
                this.startMonth = startDate.getUTCMonth() + 1
                this.startYear = startDate.getUTCFullYear()
                if (!data.isActual) {
                    const endDate = new Date(data.end_date);
                    this.endMonth = endDate.getUTCMonth() + 1
                    this.endYear = endDate.getUTCFullYear()
                }
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessage = err.error.message
                } else {
                    this.errorMessage = AppSettings.serverErrorMessage
                }
                this.isError = true
                this.loadingEducation = false
            },
            complete: () => {
                this.loadingEducation = false
                this.subsContainer.add(subEduc)
            }
        })
        const subDesc = this.descriptionService.getByProfileAndEducationId(this.profileId, this.educationId).subscribe({
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
        this.education.start_date = new Date(this.startYear, (this.startMonth - 1))
        this.education.end_date = new Date(this.endYear, (this.endMonth - 1))
        const subEducation = this.educationService.edit(this.education).subscribe({
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
                this.subsContainer.add(subEducation)
            }
        })
    }

    username: string
    educationId: number
    profileId: number
    education: IEducation
    description: IDescription

    actualYear: number = new Date().getFullYear()
    startMonth: number
    startYear: number
    endMonth: number
    endYear: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingDescription: boolean = true
    loadingEducation: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
