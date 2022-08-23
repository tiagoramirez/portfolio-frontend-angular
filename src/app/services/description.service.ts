import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDescription } from '../models/description.interface';

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

    addNew(description: IDescription): Observable<IDescription> {
        return this.http.post<IDescription>(environment.API_URL + '/description/add', description);
    }

    edit(description: IDescription): Observable<IDescription> {
        return this.http.put<IDescription>(environment.API_URL + '/description/edit', description);
    }
}