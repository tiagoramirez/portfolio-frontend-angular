import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IProfile } from 'src/app/models/profile.interface'
import { ProfileService } from 'src/app/services/profile.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  constructor (private readonly route: ActivatedRoute, private readonly profileService: ProfileService) { }

  ngOnInit (): void {
    this.username = this.route.snapshot.params['username']

    const sub: Subscription = this.profileService.getByUsername(this.username).subscribe({
      next: (data) => {
        this.profiles = data
        this.selectedProfile = data[0]
      },
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = AppSettings.serverErrorMessageSection
        }
        this.isError = true
        this.loading = false
      },
      complete: () => {
        this.loading = false
        this.subsContainer.add({ subscription: sub })
      }
    })
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  username: string
  selectedProfile: IProfile
  profiles: IProfile[] = []

  subsContainer: SubscriptionContainer = new SubscriptionContainer()

  loading: boolean = true
  isError: boolean = false
  errorMessage: string = ''
}
