import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IAboutMe } from '../models/about_me.interface'

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {
  constructor (private readonly http: HttpClient) { }

  getByProfileId (profileId: number): Observable<IAboutMe> {
    return this.http.get<IAboutMe>(environment.API_URL + '/about-me/' + String(profileId))
  }

  addNew (aboutMe: IAboutMe): Observable<IAboutMe> {
    return this.http.post<IAboutMe>(environment.API_URL + '/about-me/add', aboutMe)
  }

  edit (aboutMe: IAboutMe): Observable<IAboutMe> {
    return this.http.put<IAboutMe>(environment.API_URL + '/about-me/edit', aboutMe)
  }
}
