import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IJwtDTO } from '../models/jwt_dto.interface';
import { ILogin } from '../models/login.interface';
import { IRegister } from '../models/register.interface';
import { IUser } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public register(registerUser: IRegister): Observable<IRegister> {
        return this.http.post<IRegister>(environment.API_URL + '/auth/register', registerUser);
    }

    public login(loginUser: ILogin): Observable<IJwtDTO> {
        return this.http.post<IJwtDTO>(environment.API_URL + '/auth/login', loginUser);
    }

    public getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(environment.API_URL + '/auth/all');
    }

    checkRegister(register: IRegister, password2: string): number {
        if (register.username.length > 25) {
            return 1;
        }
        if (register.username.length == 0 || register.username === null || register.username === undefined) {
            return 2;
        }
        if (register.password.length > 20) {
            return 3;
        }
        if (register.password.length == 0 || register.password === null || register.password === undefined) {
            return 4;
        }
        if (register.full_name.length > 50) {
            return 5;
        }
        if (register.full_name.length == 0 || register.full_name === null || register.full_name === undefined) {
            return 6;
        }
        if (register.birthday > new Date() || register.birthday === null || register.birthday === undefined) {
            return 7;
        }
        if (register.mail.length > 100) {
            return 8;
        }
        if (register.mail.length == 0 || register.mail === null || register.mail === undefined) {
            return 9;
        }
        if (password2 !== register.password) {
            return 10;
        }
        return 0;
    }

    checkLogin(login: ILogin): number {
        if (login.username.length > 50) {
            return 1;
        }
        if (login.username.length == 0 || login.username === null || login.username === undefined) {
            return 2;
        }
        if (login.password.length > 50) {
            return 3;
        }
        if (login.password.length == 0 || login.password === null || login.password === undefined) {
            return 4;
        }
        return 0;
    }

    getErrorMessage(error: number): string {
        switch (error) {
            case 1: return "El usuario no puede tener mas de 25 caracteres.";
            case 2: return "El usuario no fue ingresado o no es valido.";
            case 3: return "La contraseña no puede tener mas de 20 caracteres.";
            case 4: return "La contraseña no fue ingresada o no es valida.";
            case 5: return "El nombre no puede tener mas de 50 caracteres.";
            case 6: return "El nombre no fue ingresado o no es valido.";
            case 7: return "Fecha no es valida.";
            case 8: return "El mail no puede tener mas de 100 caracteres.";
            case 9: return "El mail no fue ingresado o no es valido.";
            case 10: return "Las contraseñas no coinciden.";
            case 0: return "";
        }
        return "";
    }
}
