import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IConfiguration } from 'src/app/models/configuration.interface'
import { IProfile } from 'src/app/models/profile.interface'
import { ConfigurationService } from 'src/app/services/configuration.service'
import { ProfileService } from 'src/app/services/profile.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  constructor (private readonly route: ActivatedRoute, private readonly router: Router, private readonly tokenService: TokenService, private readonly profileService: ProfileService, private readonly configService: ConfigurationService) { }

  ngOnInit (): void {
    this.username = this.route.snapshot.params['username']
    this.profileId = this.route.snapshot.params['profileId']
    const subPerson = this.profileService.getById(this.profileId).subscribe({
      next: (data) => {
        this.profile = data
      },
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = AppSettings.serverErrorMessage
        }
        this.isError = true
        this.loadingProfile = false
      },
      complete: () => {
        this.loadingProfile = false
        this.subsContainer.add(subPerson)
      }
    })
    const subConfig = this.configService.getByProfileId(this.profileId).subscribe({
      next: (data) => {
        this.config = data
        this.config.profileId = this.profileId
      },
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = AppSettings.serverErrorMessage
        }
        this.isError = true
        this.loadingConfig = false
      },
      complete: () => {
        this.loadingConfig = false
        this.subsContainer.add(subConfig)
      }
    })
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  saveConfig (): void {
    this.isErrorLoadingNewConfig = false
    this.loadingNewConfig = true
    const subConfig = this.configService.edit(this.config).subscribe({
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
          this.errorMessageLoadingNewConfig = err.error.message
        } else {
          this.errorMessageLoadingNewConfig = AppSettings.serverErrorMessage
        }
        this.isErrorLoadingNewConfig = true
        this.loadingNewConfig = false
      },
      complete: () => {
        this.loadingNewConfig = false
        this.subsContainer.add(subConfig)
      }
    })
  }

  saveProfile (): void {
    this.isErrorLoadingNewProfile = false
    this.loadingNewProfile = true
    this.profile.userId = this.tokenService.getUserId()
    const subProfile = this.profileService.edit(this.profile).subscribe({
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
          this.errorMessageLoadingNewProfile = err.error.message
        } else {
          this.errorMessageLoadingNewProfile = AppSettings.serverErrorMessage
        }
        this.isErrorLoadingNewProfile = true
        this.loadingNewProfile = false
      },
      complete: () => {
        this.subsContainer.add(subProfile)
        this.loadingNewProfile = false
        void this.router.navigate(['/' + this.username])
      }
    })
  }

  username: string
  profileId: number
  profile: IProfile
  config: IConfiguration

  subsContainer: SubscriptionContainer = new SubscriptionContainer()

  loadingProfile: boolean = true
  loadingConfig: boolean = true
  errorMessage: string = ''
  isError: boolean = false

  loadingNewProfile: boolean = false
  errorMessageLoadingNewProfile: string = ''
  isErrorLoadingNewProfile: boolean = false

  loadingNewConfig: boolean = false
  errorMessageLoadingNewConfig: string = ''
  isErrorLoadingNewConfig: boolean = false
}
