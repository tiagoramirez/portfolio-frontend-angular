import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IProfile } from 'src/app/models/profile.interface'
import { IProject } from 'src/app/models/project.interface'
import { DescriptionService } from 'src/app/services/description.service'
import { ProjectService } from 'src/app/services/project.service'

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
    constructor(private readonly tokenService: TokenService, private readonly projectService: ProjectService, private readonly descriptionService: DescriptionService, private readonly route: ActivatedRoute) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        if (this.tokenService.getToken() != null) {
            this.loggedUsername = this.tokenService.getUsername()
            this.isLogged = true
        } else {
            this.isLogged = false
        }
        const sub = this.projectService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.projects = data
                this.projects.map((proj) => {
                    const subDesc: Subscription = this.descriptionService.getByProfileAndProjectId(this.profile.id, proj.id).subscribe({
                        next: (desc) => {
                            this.loading = true
                            proj.description = desc.description
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
                            this.subsContainer.add(subDesc)
                        }
                    })
                })
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
                this.subsContainer.add(sub)
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    username: string
    @Input() profile: IProfile
    projects: IProject[]
    loggedUsername: string
    isLogged: boolean

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false
}
