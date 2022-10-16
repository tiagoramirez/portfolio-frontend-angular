import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IRegister } from '../../models/register.interface'
import { AuthService } from '../../services/auth.service'
import { TokenService } from '../../services/token.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    isLogged: boolean = false

    userRegister: IRegister = {
        username: '',
        password: '',
        full_name: '',
        birthday: undefined,
        mail: '',
        authorities: ['ROLE_USER']
    }

    actualYear: number = new Date().getFullYear();
    day: number
    month: number
    year: number

    password2: string
    roles: string[] = []

    registerFailed: boolean = false
    errorMessage: string = ''

    loadingRegister: boolean = false

    constructor(private readonly tokenService: TokenService, private readonly authService: AuthService, private readonly router: Router) { }

    ngOnInit(): void {
        if (this.tokenService.getToken() != null) {
            this.isLogged = true
        }
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    onRegister(): void {
        this.loadingRegister = true
        this.registerFailed = false
        this.userRegister.username = this.userRegister.username.toLowerCase()
        this.userRegister.birthday = new Date(this.year, (this.month - 1), this.day)
        const errorNumber = this.authService.checkRegister(this.userRegister, this.password2)
        if (errorNumber != 0) {
            this.loadingRegister = false
            this.registerFailed = true
            this.errorMessage = this.authService.getErrorMessage(errorNumber)
        }
        else {
            const sub = this.authService.register(this.userRegister).subscribe({
                next: (data) => {
                    console.log(data.message)
                    this.loadingRegister = false
                },
                error: (e) => {
                    this.loadingRegister = false
                    this.registerFailed = true
                    if (e.error.message === null || e.error.message === undefined) {
                        this.errorMessage = 'Error en el servidor. Intenta de nuevo mas tarde 🙈'
                    } else {
                        this.errorMessage = e.error.message
                    }
                },
                complete: () => {
                    this.subsContainer.add(sub)
                    void this.router.navigate(['/login'])
                }
            })
        }
    }
}
