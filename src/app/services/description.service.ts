import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDescription } from '../models/description.interface';
import { IResponseMessage } from '../models/response_message.interface';

@Injectable({
    providedIn: 'root'
})
export class DescriptionService {

    constructor(private http: HttpClient) { }

    getByProfileAndExperienceId(profileId: number, experienceId: number): Observable<IDescription> {
        return this.http.get<IDescription>(environment.API_URL + '/description/experience/' + profileId + '/' + experienceId);
    }

    getByProfileAndEducationId(profileId: number, educationId: number): Observable<IDescription> {
        return this.http.get<IDescription>(environment.API_URL + '/description/education/' + profileId + '/' + educationId);
    }

    getByProfileAndProjectId(profileId: number, projectId: number): Observable<IDescription> {
        return this.http.get<IDescription>(environment.API_URL + '/description/project/' + profileId + '/' + projectId);
    }

    addNew(description: IDescription): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(environment.API_URL + '/description/add', description);
    }

    edit(description: IDescription): Observable<IResponseMessage> {
        return this.http.put<IResponseMessage>(environment.API_URL + '/description/edit', description);
    }

    deleteExperienceDescription(experienceId:number):Observable<IResponseMessage>{
        return this.http.delete<IResponseMessage>(environment.API_URL + '/description/delete/experience/'+ experienceId);
    }
}