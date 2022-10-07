import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IEducation } from '../models/education.interface'
import { IResponseMessage } from '../models/response_message.interface'

@Injectable({
    providedIn: 'root'
})
export class EducationService {
    constructor(private readonly http: HttpClient) { }

    getByUsername(username: string): Observable<IEducation[]> {
        return this.http.get<IEducation[]>(environment.API_URL + '/education/get/' + username)
    }

    getById(educationId: number): Observable<IEducation> {
        return this.http.get<IEducation>(environment.API_URL + '/education?id=' + educationId)
    }

    addNew(education: IEducation): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(environment.API_URL + '/education/add', education)
    }

    edit(education: IEducation): Observable<IResponseMessage> {
        return this.http.put<IResponseMessage>(environment.API_URL + '/education/edit', education)
    }

    delete(educationId: number): Observable<IResponseMessage> {
        return this.http.delete<IResponseMessage>(environment.API_URL + '/education/delete/' + educationId)
    }
}
