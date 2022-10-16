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
    selector: 'app-new-education',
    templateUrl: './new-education.component.html',
    styleUrls: ['./new-education.component.css']
})
export class NewEducationComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly educationService: EducationService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

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
        this.education.start_date = new Date(this.startYear, (this.startMonth - 1))
        this.education.end_date = new Date(this.endYear, (this.endMonth - 1))
        const subEducation = this.educationService.addNew(this.education).subscribe({
            next: (data) => {
                this.description.profileId = this.profileId
                this.description.educationId = data.id
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
                this.subsContainer.add(subEducation)
            }
        })
    }

    username: string
    profileId: number
    education: IEducation = {
        userId: this.tokenService.getUserId(),
        type: '',
        title_name: '',
        institute_name: '',
        isActual: false,
        start_date: new Date(),
        end_date: new Date()
    }

    description: IDescription = {
        profileId: 0,
        educationId: 0,
        description: ''
    }

    actualYear: number = new Date().getFullYear()
    startMonth: number
    startYear: number
    endMonth: number
    endYear: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
