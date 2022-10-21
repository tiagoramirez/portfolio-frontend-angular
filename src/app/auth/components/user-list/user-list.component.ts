import { Component, OnDestroy, OnInit } from '@angular/core'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IUser } from '../../models/user.interface'
import { AuthService } from '../../services/auth.service'
import { TokenService } from '../../services/token.service'

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
    constructor(private readonly authService: AuthService, private readonly tokenService: TokenService) { }

    ngOnInit(): void {
        (this.tokenService.getToken() != null) ? this.isLogged = true : this.isLogged = false

        const sub = this.authService.getAllUsers().subscribe({
            next: (data) => {
                this.users = data
                this.loading = false
                this.isError = false
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

    onLogout(): void {
        this.tokenService.logOut()
        window.location.reload()
    }

    users: IUser[] = []

    isLogged: boolean

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false
}
