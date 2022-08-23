import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEducation } from '../models/education.interface';

@Injectable({
    providedIn: 'root'
})
export class EducationService {

    constructor(private http: HttpClient) { }

    getByUsername(username: string): Observable<IEducation[]> {
        return this.http.get<IEducation[]>(environment.API_URL + '/education/' + username);
    }

    addNew(education: IEducation): Observable<IEducation> {
        return this.http.post<IEducation>(environment.API_URL + '/education/add', education);
    }

    edit(education: IEducation): Observable<IEducation> {
        return this.http.put<IEducation>(environment.API_URL + '/education/edit', education);
    }

    delete(educationId: number): any {
        return this.http.delete<any>(environment.API_URL + '/education/delete/' + educationId);
    }
}
