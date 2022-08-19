import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IExperience } from '../models/experience.interface';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {

    constructor(private http: HttpClient) { }

    getByUsername(username: string): Observable<IExperience[]> {
        return this.http.get<IExperience[]>(environment.API_URL + '/experience/' + username);
    }

    addNew(experience: IExperience): Observable<IExperience> {
        return this.http.post<IExperience>(environment.API_URL + '/experience/add', experience);
    }

    edit(experience: IExperience): Observable<IExperience> {
        return this.http.put<IExperience>(environment.API_URL + '/experience/edit', experience);
    }

    delete(experienceId: number): any {
        return this.http.delete<any>(environment.API_URL + '/experience/delete/' + experienceId);
    }
}
