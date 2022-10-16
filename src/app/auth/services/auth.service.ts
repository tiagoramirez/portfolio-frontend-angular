/* eslint-disable indent */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { checkEmail } from 'src/app/helpers/checkEmail'
import { checkPassword } from 'src/app/helpers/checkPassword'
import { checkUsername } from 'src/app/helpers/checkUsername'
import { IResponseMessage } from 'src/app/models/response_message.interface'
import { environment } from 'src/environments/environment'
import { IJwtDTO } from '../models/jwt_dto.interface'
import { ILogin } from '../models/login.interface'
import { IRegister } from '../models/register.interface'
import { IUser } from '../models/user.interface'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private readonly http: HttpClient) { }

    public register(registerUser: IRegister): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(environment.API_URL + '/auth/register', registerUser)
    }

    public login(loginUser: ILogin): Observable<IJwtDTO> {
        return this.http.post<IJwtDTO>(environment.API_URL + '/auth/login', loginUser)
    }

    public getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(environment.API_URL + '/auth/all')
    }

    public getUserByUsername(username: string): Observable<IUser> {
        return this.http.get<IUser>(environment.API_URL + '/auth/user/' + username)
    }

    checkRegister(registerData: IRegister, password2: string): number {
        if (!checkUsername(registerData.username)) {
            return 1;
        }
        if (!checkPassword(registerData.password)) {
            return 2;
        }
        if (registerData.password !== password2) {
            return 3;
        }
        if (!checkEmail(registerData.mail)) {
            return 4;
        }

        return 0;
    }

    getErrorMessage(errorNumber: number): string {
        switch (errorNumber) {
            case 1:
                return "El usuario invalido. Los caracteres especiales permitidos son _ y ."
            case 2:
                return "La contraseña debe tener una mayuscula, una minuscula, un caracter especial y un numero"
            case 3:
                return "Las contraseñas no coinciden"
            case 4:
                return "Mail invalido"
            default:
                return ""
        }
    }
}
