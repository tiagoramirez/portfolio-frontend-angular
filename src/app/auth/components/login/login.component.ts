import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IJwtDTO } from '../../models/jwt_dto.interface';
import { ILogin } from '../../models/login.interface';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    isLogged: boolean = false;

    userLogin: ILogin = {
        username: "",
        password: ""
    }
    roles: string[] = [];

    loginFailed: boolean = false;
    errorMessage: string = "";

    loadingLogin: boolean = false;

    constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if (this.tokenService.getToken()) {
            this.isLogged = true;
            this.roles = this.tokenService.getAuthorities();
        }
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    onLogin(): void {
        this.loadingLogin = true;
        const errorNumber = this.authService.checkLogin(this.userLogin);
        if (errorNumber != 0) {
            this.loginFailed = true;
            this.errorMessage = this.authService.getErrorMessage(errorNumber);
        }
        else {
            this.loginFailed = false;
            let sub = this.authService.login(this.userLogin).subscribe({
                next: (jwt) => {
                    this.loadingLogin = false;
                    this.isLogged = true;
                    this.loginFailed = false;
                    this.tokenService.setToken(jwt.token);
                    this.tokenService.setUsername(jwt.username);
                    this.tokenService.setAuthorities(jwt.authorities);
                    this.tokenService.setUserId(jwt.userId);
                    this.roles = jwt.authorities;
                    this.router.navigate(['']);
                },
                error: (e) => {
                    this.loadingLogin = false;
                    this.isLogged = false;
                    this.loginFailed = true;
                    if (e.error.message === null || e.error.message === undefined) {
                        this.errorMessage = "Error del servidor";
                    }
                    else {
                        this.errorMessage = e.error.message;
                    }
                },
                complete: () => {
                    this.subsContainer.add(sub);
                }
            });
        }
    }
}