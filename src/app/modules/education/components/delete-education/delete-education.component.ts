import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { DescriptionService } from 'src/app/services/description.service'
import { EducationService } from 'src/app/services/education.service'

@Component({
    selector: 'app-delete-education',
    templateUrl: './delete-education.component.html',
    styleUrls: ['./delete-education.component.css']
})
export class DeleteEducationComponent implements OnInit, OnDestroy {
    constructor (private readonly route: ActivatedRoute, private readonly educationService: EducationService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

    ngOnInit (): void {
        this.username = this.route.snapshot.params['username']
        this.educationId = this.route.snapshot.params['educationId']
    }

    ngOnDestroy (): void {
        this.subsContainer.unsubscribeAll()
    }

    delete (): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const subDes = this.descriptionService.deleteEducationDescription(this.educationId).subscribe({
            next: () => {
                const subExp = this.educationService.delete(this.educationId).subscribe({
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
                        this.subsContainer.add(subExp)
                        void this.router.navigate([this.username])
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
                this.subsContainer.add(subDes)
            }
        })
    }

    username: string
    educationId: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
