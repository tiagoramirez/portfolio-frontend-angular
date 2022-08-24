import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITechnologie, IUserTechnologie } from '../models/technologie.interface';

@Injectable({
    providedIn: 'root'
})
export class TechnologieService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<ITechnologie[]> {
        return this.http.get<ITechnologie[]>(environment.API_URL + "/technologie/all");
    }

    getAllByUsername(username: string): Observable<IUserTechnologie[]> {
        return this.http.get<IUserTechnologie[]>(environment.API_URL + "/technologie/" + username);
    }

    getById(userTechId: number): Observable<IUserTechnologie> {
        return this.http.get<IUserTechnologie>(environment.API_URL + "/technologie?uuserTechId=" + userTechId);
    }

    addNew(userTech: IUserTechnologie): Observable<IUserTechnologie> {
        return this.http.post<IUserTechnologie>(environment.API_URL + "/technologie/add", userTech);
    }

    edit(userTech: IUserTechnologie): Observable<IUserTechnologie> {
        return this.http.put<IUserTechnologie>(environment.API_URL + "/technologie/edit", userTech);
    }

    delete(userTechId: number): Observable<IUserTechnologie> {
        return this.http.delete<IUserTechnologie>(environment.API_URL + "/technologie/delete/" + userTechId);
    }
}
