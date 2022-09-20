import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
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
  constructor (private readonly http: HttpClient) { }

  public register (registerUser: IRegister): Observable<IResponseMessage> {
    return this.http.post<IResponseMessage>(environment.API_URL + '/auth/register', registerUser)
  }

  public login (loginUser: ILogin): Observable<IJwtDTO> {
    return this.http.post<IJwtDTO>(environment.API_URL + '/auth/login', loginUser)
  }

  public getAllUsers (): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.API_URL + '/auth/all')
  }

  public getUserByUsername (username: string): Observable<IUser> {
    return this.http.get<IUser>(environment.API_URL + '/auth/user/' + username)
  }
}
