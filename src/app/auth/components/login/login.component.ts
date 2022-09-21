import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { ILogin } from '../../models/login.interface'
import { AuthService } from '../../services/auth.service'
import { TokenService } from '../../services/token.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    isLogged: boolean = false

    userLogin: ILogin = {
        username: '',
        password: ''
    }

    roles: string[] = []

    loginFailed: boolean = false
    errorMessage: string = ''

    loadingLogin: boolean = false

    constructor(private readonly tokenService: TokenService, private readonly authService: AuthService, private readonly router: Router) { }

    ngOnInit(): void {
        if (this.tokenService.getToken() !== null) {
            this.isLogged = true
            this.roles = this.tokenService.getAuthorities()
        }
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    onLogin(): void {
        this.loadingLogin = true
        this.loginFailed = false
        const sub = this.authService.login(this.userLogin).subscribe({
            next: (jwt) => {
                this.loadingLogin = false
                this.isLogged = true
                this.loginFailed = false
                this.tokenService.setToken(jwt.token)
                this.tokenService.setUsername(jwt.username)
                this.tokenService.setAuthorities(jwt.authorities)
                this.tokenService.setUserId(jwt.userId)
                this.roles = jwt.authorities
                void this.router.navigate([''])
            },
            error: (e) => {
                this.loadingLogin = false
                this.isLogged = false
                this.loginFailed = true
                if (e.error.message === null || e.error.message === undefined) {
                    this.errorMessage = 'Error en el servidor. Intenta de nuevo mas tarde 🙈'
                } else {
                    this.errorMessage = e.error.message
                }
            },
            complete: () => {
                this.subsContainer.add(sub)
            }
        })
    }
}
