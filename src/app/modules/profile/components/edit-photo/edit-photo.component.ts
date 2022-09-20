import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { TokenService } from 'src/app/auth/services/token.service'
import { getBase64 } from 'src/app/helpers/getBase64'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { BannerService } from 'src/app/services/banner.service'
import { PhotoService } from 'src/app/services/photo.service'

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit, OnDestroy {
  constructor (private readonly route: ActivatedRoute, private readonly photoService: PhotoService, private readonly router: Router, private readonly bannerService: BannerService, private readonly tokenService: TokenService) { }

  ngOnInit (): void {
    this.username = this.route.snapshot.params['username']
    this.type = this.route.snapshot.params['type']
    if (this.type === 'photo') {
      const subPhoto: Subscription = this.photoService.getByUsername(this.username).subscribe({
        next: (data) => {
          if (data === null || data === undefined) {
            this.photoLoaded = false
            this.isFirstPhoto = true
          } else {
            this.photoId = data.id
            this.userId = data.userId
            this.isFirstPhoto = false
            this.photoLoaded = true
            this.photoString = 'data:image/jpeg;base64,' + data.photo
          }
        },
        error: (e) => {
          this.error = true
          this.loading = false
          console.error(e)
        },
        complete: () => {
          this.error = false
          this.loading = false
          this.subsContainer.add({ subscription: subPhoto })
        }
      })
    } else if (this.type === 'banner') {
      const subBanner: Subscription = this.bannerService.getByUsername(this.username).subscribe({
        next: (data) => {
          if (data === null || data === undefined) {
            this.photoLoaded = false
            this.isFirstPhoto = true
          } else {
            this.photoId = data.id
            this.userId = data.userId
            this.isFirstPhoto = false
            this.photoLoaded = true
            this.photoString = 'data:image/jpeg;base64,' + data.banner
          }
        },
        error: (e) => {
          this.error = true
          this.loading = false
          console.error(e)
        },
        complete: () => {
          this.error = false
          this.loading = false
          this.subsContainer.add({ subscription: subBanner })
        }
      })
    }
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  loadImg (event: any) {
    this.photoFile = <File>event.target.files[0]
    getBase64(this.photoFile).then((res: any) => this.photoString = res.base)
    this.photoLoaded = true
    this.isPhotoSelected = true
  }

  saveImg () {
    if (this.photoFile !== undefined && this.photoFile !== null) {
      if (this.type === 'photo' && this.isFirstPhoto) {
        const subPhoto: Subscription = this.photoService.addNew(this.photoFile, this.tokenService.getUserId()).subscribe({
          next: () => {
            console.log('Nueva foto cargada exitosamente')
          },
          error: (e) => {
            console.error(e)
          },
          complete: () => {
            this.subsContainer.add({ subscription: subPhoto })
            this.router.navigate(['/' + this.username])
          }
        })
      } else if (this.type === 'banner' && this.isFirstPhoto) {
        const subBanner: Subscription = this.bannerService.addNew(this.photoFile, this.tokenService.getUserId()).subscribe({
          next: () => {
            console.log('Nueva foto cargada exitosamente')
          },
          error: (e) => {
            console.error(e)
          },
          complete: () => {
            this.subsContainer.add({ subscription: subBanner })
            this.router.navigate(['/' + this.username])
          }
        })
      } else if (this.type === 'photo' && !this.isFirstPhoto) {
        const subPhoto: Subscription = this.photoService.edit(this.photoFile, this.tokenService.getUserId(), this.photoId).subscribe({
          next: () => {
            console.log('Nueva foto cargada exitosamente')
          },
          error: (e) => {
            console.error(e)
          },
          complete: () => {
            this.subsContainer.add({ subscription: subPhoto })
            this.router.navigate(['/' + this.username])
          }
        })
      } else if (this.type === 'banner' && !this.isFirstPhoto) {
        const subBanner: Subscription = this.bannerService.edit(this.photoFile, this.tokenService.getUserId(), this.photoId).subscribe({
          next: () => {
            console.log('Nueva foto cargada exitosamente')
          },
          error: (e) => {
            console.error(e)
          },
          complete: () => {
            this.subsContainer.add({ subscription: subBanner })
            this.router.navigate(['/' + this.username])
          }
        })
      }
    } else {
      this.error = true
      this.errorMessage = 'No se selecciono ninguna imagen nueva'
    }
  }

  type: string
  username: string
  photoString: string
  photoFile: File
  photoId: number
  userId: number

  subsContainer: SubscriptionContainer = new SubscriptionContainer()

  isFirstPhoto: boolean
  loading: boolean = true
  photoLoaded: boolean = false
  isPhotoSelected: boolean = false
  error: boolean = false
  errorMessage: string
}
