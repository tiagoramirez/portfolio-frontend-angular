import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IRegister } from '../../models/register.interface';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
            this.roles = this.tokenService.getAuthorities();
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
            let sub = this.authService.register(this.userRegister).subscribe({
                next: () => {
                    this.loadingRegister = false;
                    console.log("Registrado con exito");
                    this.router.navigate(['/login']);
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
                }
            });
        }
    }
}