import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IDescription } from 'src/app/models/description.interface'
import { IProject } from 'src/app/models/project.interface'
import { DescriptionService } from 'src/app/services/description.service'
import { ProjectService } from 'src/app/services/project.service'

@Component({
    selector: 'app-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly projectService: ProjectService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

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
        const subProj = this.projectService.addNew(this.project).subscribe({
            next: (data) => {
                this.description.profileId = this.profileId
                this.description.projectId = data.id
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
                this.subsContainer.add(subProj)
            }
        })
    }

    username: string
    profileId: number
    project: IProject = {
        userId: this.tokenService.getUserId(),
        name: '',
        link: ''
    }

    description: IDescription = {
        profileId: 0,
        projectId: 0,
        description: ''
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
