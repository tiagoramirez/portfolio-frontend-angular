import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { DescriptionService } from 'src/app/services/description.service'
import { ProjectService } from 'src/app/services/project.service'

@Component({
    selector: 'app-delete-project',
    templateUrl: './delete-project.component.html',
    styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly projectService: ProjectService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.projectId = this.route.snapshot.params['projectId']
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    delete(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const subDes = this.descriptionService.deleteProjectDescription(this.projectId).subscribe({
            next: () => {
                const subProj = this.projectService.delete(this.projectId).subscribe({
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
                        this.subsContainer.add(subProj)
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
    projectId: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
