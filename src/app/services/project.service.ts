import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProject } from '../models/project.interface';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) { }

    getByUsername(username: string): Observable<IProject[]> {
        return this.http.get<IProject[]>(environment.API_URL + '/project/' + username);
    }

    addNew(project: IProject): Observable<IProject> {
        return this.http.post<IProject>(environment.API_URL + '/project/add', project);
    }

    edit(project: IProject): Observable<IProject> {
        return this.http.put<IProject>(environment.API_URL + '/project/edit', project);
    }

    delete(projectId: number): any {
        return this.http.delete<any>(environment.API_URL + '/project/delete/' + projectId);
    }

}
