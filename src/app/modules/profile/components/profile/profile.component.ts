import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { IUser } from 'src/app/auth/models/user.interface'
import { AuthService } from 'src/app/auth/services/auth.service'
import { TokenService } from 'src/app/auth/services/token.service'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IConfiguration } from 'src/app/models/configuration.interface'
import { IProfile } from 'src/app/models/profile.interface'
import { BannerService } from 'src/app/services/banner.service'
import { ConfigurationService } from 'src/app/services/configuration.service'
import { PhotoService } from 'src/app/services/photo.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor (private readonly route: ActivatedRoute, private readonly authService: AuthService, private readonly tokenService: TokenService, private readonly configurationService: ConfigurationService, private readonly photoService: PhotoService, private readonly bannerService: BannerService) { }

  ngOnInit (): void {
    this.username = this.route.snapshot.params['username']

    if (this.tokenService.getToken()) {
      this.loggedUsername = this.tokenService.getUsername()
      this.isLogged = true
    } else {
      this.isLogged = false
    }

    const subUser: Subscription = this.authService.getUserByUsername(this.username).subscribe({
      next: (data) => {
        this.user = data
      },
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = AppSettings.serverErrorMessage
        }
        this.isError = true
        this.loadingUser = false
      },
      complete: () => {
        this.loadingUser = false
        this.subsContainer.add({ subscription: subUser })
      }
    })

    const subConfiguration: Subscription = this.configurationService.getByProfileId(this.profile.id).subscribe({
      next: (data) => {
        this.configuration = data
      },
      error: (err) => {
        if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
          this.errorMessage = err.error.message
        } else {
          this.errorMessage = AppSettings.serverErrorMessage
        }
        this.isError = true
        this.loadingConfig = false
      },
      complete: () => {
        this.loadingConfig = false
        this.isError = false
        this.subsContainer.add({ subscription: subConfiguration })
        if (this.configuration.show_photo) {
          const subPhoto: Subscription = this.photoService.getByUsername(this.username).subscribe({
            next: (data) => {
              if (data === null || data === undefined) {
                this.isPhotoNull = true
              } else {
                this.isPhotoNull = false
                this.photoString = 'data:image/jpeg;base64,' + data.photo
              }
            },
            error: (err) => {
              if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                this.errorMessage = err.error.message
              } else {
                this.errorMessage = AppSettings.serverErrorMessage
              }
              this.isError = true
              this.loadingPhoto = false
            },
            complete: () => {
              this.loadingPhoto = false
              this.subsContainer.add({ subscription: subPhoto })
            }
          })
        }
        if (this.configuration.show_banner) {
          const subBanner: Subscription = this.bannerService.getByUsername(this.username).subscribe({
            next: (data) => {
              if (data === null || data === undefined) {
                this.isBannerNull = true
              } else {
                this.isBannerNull = false
                this.bannerString = 'data:image/jpeg;base64,' + data.banner
              }
            },
            error: (err) => {
              if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                this.errorMessage = err.error.message
              } else {
                this.errorMessage = AppSettings.serverErrorMessage
              }
              this.isError = true
              this.loadingBanner = false
            },
            complete: () => {
              this.loadingBanner = false
              this.subsContainer.add({ subscription: subBanner })
            }
          })
        }
        if (!this.configuration.show_photo && !this.configuration.show_banner) {
          this.loadingBanner = false
          this.loadingPhoto = false
        }
      }
    })
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  openModal () {
    this.showModal = true
  }

  closeModal () {
    this.showModal = false
  }

  username: string
  loggedUsername: string = ''
  isLogged: boolean
  user: IUser
  configuration: IConfiguration
  @Input() profile: IProfile
  showModal = false
  isPhotoNull = false
  photoString: string
  isBannerNull = false
  bannerString: string

  subsContainer: SubscriptionContainer = new SubscriptionContainer()

  loading: boolean = true
  loadingUser: boolean = true
  loadingConfig: boolean = true
  loadingPhoto: boolean = true
  loadingBanner: boolean = true
  errorMessage: string = ''
  isError: boolean = false
}
