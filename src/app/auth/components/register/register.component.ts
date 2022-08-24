import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IProfile } from 'src/app/models/profile.interface';
import { AboutMeService } from 'src/app/services/about-me.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ProfileService } from 'src/app/services/profile.service';
import { IRegister } from '../../models/register.interface';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    isLogged: boolean = false;

    userRegister: IRegister = {
        username: '',
        password: '',
        full_name: '',
        birthday: new Date(),
        mail: '',
        authorities: ["ROLE_USER"]
    }
    password2: string;
    roles: string[] = [];

    registerFailed: boolean = false;
    errorMessage: string = "";

    loadingRegister: boolean = false;

    constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        if (this.tokenService.getToken()) {
            this.isLogged = true;
        }
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    onRegister(): void {
        this.loadingRegister = true;
        const errorNumber = this.authService.checkRegister(this.userRegister, this.password2);
        if (errorNumber != 0) {
            this.loadingRegister = false;
            this.registerFailed = true;
            this.errorMessage = this.authService.getErrorMessage(errorNumber);
        }
        else {
            this.registerFailed = false;
            this.userRegister.username = this.userRegister.username.toLowerCase();
            let sub = this.authService.register(this.userRegister).subscribe({
                next: (data) => {
                    console.log(data.message);
                    this.loadingRegister = false;
                },
                error: (e) => {
                    this.loadingRegister = false;
                    this.registerFailed = true;
                    if (e.error.message === null || e.error.message === undefined) {
                        this.errorMessage = "Error en el servidor. Intenta de nuevo mas tarde 🙈";
                    }
                    else {
                        this.errorMessage = e.error.message;
                    }
                },
                complete: () => {
                    this.subsContainer.add(sub);
                    this.router.navigate(['/login']);
                }
            });
        }
    }
}