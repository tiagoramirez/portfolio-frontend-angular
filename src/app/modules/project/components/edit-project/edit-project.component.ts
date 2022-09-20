import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
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
export class EditProjectComponent implements OnInit {
  constructor (private readonly route: ActivatedRoute, private readonly tokenService: TokenService, private readonly projectService: ProjectService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

  ngOnInit (): void {
    this.username = this.route.snapshot.params['username']
    this.projectId = this.route.snapshot.params['projectId']
    this.profileId = this.route.snapshot.params['profileId']
    const subProj = this.projectService.getById(this.projectId).subscribe({
      next: (data) => {
        this.project = data
      },
      error: (err) => {
        this.loadingProject = false
        console.error(err)
      },
      complete: () => {
        this.loadingProject = false
        this.subsContainer.add({ subscription: subProj })
      }
    })
    const subDesc = this.descriptionService.getByProfileAndProjectId(this.profileId, this.projectId).subscribe({
      next: (data) => {
        this.description = data
      },
      error: (err) => {
        this.loadingDescription = false
        console.error(err)
      },
      complete: () => {
        this.loadingDescription = false
        this.subsContainer.add({ subscription: subDesc })
      }
    })
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  save () {
    this.project.userId = this.tokenService.getUserId()
    this.description.profileId = this.profileId
    const subProject = this.projectService.edit(this.project).subscribe({
      next: () => {
        const subDescription = this.descriptionService.edit(this.description).subscribe({
          next (value) {
            console.log(value)
          },
          error (err) {
            console.error(err)
          },
          complete: () => {
            this.subsContainer.add({ subscription: subDescription })
          }
        })
      },
      error (err) {
        console.error(err)
      },
      complete: () => {
        this.subsContainer.add({ subscription: subProject })
        this.router.navigate(['/' + this.username])
      }
    })
  }

  username: string
  projectId: number
  profileId: number
  project: IProject
  description: IDescription

  subsContainer: SubscriptionContainer = new SubscriptionContainer()

  loadingSubmit: boolean = false
  loadingProject: boolean = true
  loadingDescription: boolean = true
}
