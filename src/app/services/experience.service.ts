import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IExperience } from '../models/experience.interface'
import { IResponseMessage } from '../models/response_message.interface'

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    constructor(private readonly http: HttpClient) { }

    getByUsername(username: string): Observable<IExperience[]> {
        return this.http.get<IExperience[]>(environment.API_URL + '/experience/get/' + username)
    }

    getById(experienceId: number): Observable<IExperience> {
        return this.http.get<IExperience>(environment.API_URL + '/experience?id=' + experienceId)
    }

    addNew(experience: IExperience): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(environment.API_URL + '/experience/add', experience)
    }

    edit(experience: IExperience): Observable<IResponseMessage> {
        return this.http.put<IResponseMessage>(environment.API_URL + '/experience/edit', experience)
    }

    delete(experienceId: number): Observable<IResponseMessage> {
        return this.http.delete<IResponseMessage>(environment.API_URL + '/experience/delete/' + experienceId)
    }
}
