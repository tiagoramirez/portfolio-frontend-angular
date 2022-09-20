import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { DescriptionService } from 'src/app/services/description.service'
import { ExperienceService } from 'src/app/services/experience.service'

@Component({
  selector: 'app-delete-experience',
  templateUrl: './delete-experience.component.html',
  styleUrls: ['./delete-experience.component.css']
})
export class DeleteExperienceComponent implements OnInit, OnDestroy {
  constructor (private readonly route: ActivatedRoute, private readonly experienceService: ExperienceService, private readonly descriptionService: DescriptionService, private readonly router: Router) { }

  ngOnInit (): void {
    this.username = this.route.snapshot.params['username']
    this.experienceId = this.route.snapshot.params['experienceId']
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  delete () {
    this.isErrorLoadingNewData = false
    this.loadingNewData = true
    const subDes = this.descriptionService.deleteExperienceDescription(this.experienceId).subscribe({
      next: () => {
        const subExp = this.experienceService.delete(this.experienceId).subscribe({
          error: (err) => {
            if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
              this.errorMessageLoadingNewData = err.error.message
            } else {
              this.errorMessageLoadingNewData = AppSettings.serverErrorMessage
            }
            this.isErrorLoadingNewData = true
            this.loadingNewData = false
          },
          complete: () => {
            this.loadingNewData = false
            this.subsContainer.add({ subscription: subExp })
            this.router.navigate([this.username])
          }
        })
      },
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
          this.errorMessageLoadingNewData = err.error.message
        } else {
          this.errorMessageLoadingNewData = AppSettings.serverErrorMessage
        }
        this.isErrorLoadingNewData = true
        this.loadingNewData = false
      },
      complete: () => {
        this.subsContainer.add({ subscription: subDes })
      }
    })
  }

  username: string
  experienceId: number

  subsContainer: SubscriptionContainer = new SubscriptionContainer()

  loadingNewData: boolean = false
  errorMessageLoadingNewData: string = ''
  isErrorLoadingNewData: boolean = false
}
