import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IExperience } from 'src/app/models/experience.interface'
import { IProfile } from 'src/app/models/profile.interface'
import { DescriptionService } from 'src/app/services/description.service'
import { ExperienceService } from 'src/app/services/experience.service'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  constructor (private readonly tokenService: TokenService, private readonly experienceService: ExperienceService, private readonly descriptionService: DescriptionService, private readonly route: ActivatedRoute) { }

  ngOnInit () {
    this.username = this.route.snapshot.params['username']
    if (this.tokenService.getToken()) {
      this.loggedUsername = this.tokenService.getUsername()
      this.isLogged = true
    } else {
      this.isLogged = false
    }
    const sub = this.experienceService.getByUsername(this.username).subscribe({
      next: (data) => {
        this.experiences = data
        this.experiences.map((exp) => {
          const subDesc: Subscription = this.descriptionService.getByProfileAndExperienceId(this.profile.id, exp.id).subscribe({
            next: (desc) => {
              this.loading = true
              exp.description = desc.description
            },
            error: (err) => {
              if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                this.errorMessage = err.error.message
              } else {
                this.errorMessage = AppSettings.serverErrorMessage
              }
              this.isError = true
              this.loading = false
            },
            complete: () => {
              this.loading = false
              this.subsContainer.add({ subscription: subDesc })
            }
          })
        })
      },
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = AppSettings.serverErrorMessage
        }
        this.isError = true
        this.loading = false
      },
      complete: () => {
        this.subsContainer.add({ subscription: sub })
      }
    })
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  username: string
  @Input() profile: IProfile
  experiences: IExperience[]
  loggedUsername: string
  isLogged: boolean

  subsContainer: SubscriptionContainer = new SubscriptionContainer()

  loading: boolean = true
  errorMessage: string = ''
  isError: boolean = false
}
