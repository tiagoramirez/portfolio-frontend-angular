import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AppSettings } from 'src/app/helpers/appSettings'
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
    constructor(private readonly tokenService: TokenService, private readonly authService: AuthService, private readonly router: Router, private readonly route: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.tokenService.getToken() !== null) {
            this.isLogged = true
        }
        this.usernameToRedirect = this.route.snapshot.params['username']
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
                this.loginFailed = false
                this.tokenService.setToken(jwt.token)
                this.tokenService.setUsername(jwt.username)
                const mappedAuthorities = jwt.authorities.map(authority => {
                    return authority.authority;
                })
                this.tokenService.setAuthorities(mappedAuthorities)
                this.tokenService.setUserId(jwt.userId)
                if (this.usernameToRedirect !== undefined) {
                    void this.router.navigate(['' + this.usernameToRedirect])
                }
                else {
                    void this.router.navigate([''])
                }
            },
            error: (e) => {
                this.loadingLogin = false
                this.loginFailed = true
                if (e.error.message === null || e.error.message === undefined) {
                    this.errorMessage = AppSettings.serverErrorMessage;
                } else {
                    this.errorMessage = e.error.message
                }
            },
            complete: () => {
                this.subsContainer.add(sub)
            }
        })
    }

    isLogged: boolean = false
    userLogin: ILogin = {
        username: '',
        password: ''
    }
    usernameToRedirect: string;

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingLogin: boolean = false
    errorMessage: string = ''
    loginFailed: boolean = false
}