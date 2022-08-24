import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkEmail } from 'src/app/helpers/checkEmail';
import { checkPassword } from 'src/app/helpers/checkPassword';
import { IResponseMessage } from 'src/app/models/response_message.interface';
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

    public register(registerUser: IRegister): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(environment.API_URL + '/auth/register', registerUser);
    }

    public login(loginUser: ILogin): Observable<IJwtDTO> {
        return this.http.post<IJwtDTO>(environment.API_URL + '/auth/login', loginUser);
    }

    public getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(environment.API_URL + '/auth/all');
    }

    public getUserByUsername(username: string): Observable<IUser> {
        return this.http.get<IUser>(environment.API_URL + '/auth/user/' + username);
    }

    checkRegister(register: IRegister, password2: string): number {
        if (register.username.length < 5 || register.username.length > 15) {
            return 1;
        }
        if (register.username.length == 0 || register.username === null || register.username === undefined) {
            return 2;
        }
        if (register.password.length < 8 || register.password.length > 20) {
            return 3;
        }
        if (register.password.length == 0 || register.password === null || register.password === undefined) {
            return 4;
        }
        if (password2 !== register.password) {
            return 11;
        }
        if (!checkPassword(register.password)) {
            return 12;
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
        if (!checkEmail(register.mail)) {
            return 10;
        }
        return 0;
    }

    checkLogin(login: ILogin): number {
        if (login.username.length == 0 || login.username === null || login.username === undefined) {
            return 2;
        }
        if (login.password.length == 0 || login.password === null || login.password === undefined) {
            return 4;
        }
        return 0;
    }

    getErrorMessage(error: number): string {
        switch (error) {
            case 1: return "El usuario debe tener entre 5 y 15 caracteres.";
            case 2: return "El usuario no fue ingresado o no es valido.";
            case 3: return "La contraseña debe tener entre 8 y 20 caracteres.";
            case 4: return "La contraseña no fue ingresada o no es valida.";
            case 5: return "El nombre no puede tener mas de 50 caracteres.";
            case 6: return "El nombre no fue ingresado o no es valido.";
            case 7: return "Fecha no es valida.";
            case 8: return "El mail no puede tener mas de 100 caracteres.";
            case 9: return "El mail no fue ingresado o no es valido.";
            case 10: return "El mail es invalido.";
            case 11: return "Las contraseñas no coinciden.";
            case 12: return "La contraseña debe tener al menos 1 mayuscula, 1 minuscula, 1 caracter especial y 1 numero.";
            case 0: return "";
        }
        return "";
    }
}
