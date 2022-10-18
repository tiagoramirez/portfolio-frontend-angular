import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { checkProtocolURL } from 'src/app/helpers/checkProtocolURL'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IDescription } from 'src/app/models/description.interface'
import { IProject } from 'src/app/models/project.interface'
import { DescriptionService } from 'src/app/services/description.service'
import { ProjectService } from 'src/app/services/project.service'

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly projectService: ProjectService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.projectId = this.route.snapshot.params['projectId']
        this.profileId = this.route.snapshot.params['profileId']
        const subProj = this.projectService.getById(this.projectId).subscribe({
            next: (data) => {
                this.project = data
                this.project.userId = this.tokenService.getUserId()
                this.hasLink = data.link !== ''
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessage = err.error.message
                } else {
                    this.errorMessage = AppSettings.serverErrorMessage
                }
                this.isError = true
                this.loadingProject = false
            },
            complete: () => {
                this.loadingProject = false
                this.subsContainer.add(subProj)
            }
        })
        const subDesc = this.descriptionService.getByProfileAndProjectId(this.profileId, this.projectId).subscribe({
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
        if (!this.hasLink) this.project.link = ''
        const errorNumber = this.projectService.check(this.project, this.hasLink)
        if (errorNumber != 0) {
            this.isErrorLoadingNewData = true
            this.loadingNewData = false
            this.errorMessageLoadingNewData = this.projectService.getErrorMessage(errorNumber)
        }
        else {
            if (this.hasLink) this.project.link = checkProtocolURL(this.project.link)
            const subProject = this.projectService.edit(this.project).subscribe({
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
                    this.subsContainer.add(subProject)
                }
            })
        }
    }

    username: string
    projectId: number
    profileId: number
    project: IProject
    description: IDescription
    hasLink: boolean

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingDescription: boolean = true
    loadingProject: boolean = true
    errorMessage: string = ''
    isError: boolean = false

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
