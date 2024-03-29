/* eslint-disable indent */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { checkURL } from '../helpers/checkURL'
import { IProject } from '../models/project.interface'
import { IResponseMessage } from '../models/response_message.interface'

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    constructor(private readonly http: HttpClient) { }

    getByUsername(username: string): Observable<IProject[]> {
        return this.http.get<IProject[]>(environment.API_URL + '/project/get/' + username)
    }

    getById(projectId: number): Observable<IProject> {
        return this.http.get<IProject>(environment.API_URL + '/project?id=' + projectId)
    }

    addNew(project: IProject): Observable<IResponseMessage> {
        return this.http.post<IResponseMessage>(environment.API_URL + '/project/add', project)
    }

    edit(project: IProject): Observable<IResponseMessage> {
        return this.http.put<IResponseMessage>(environment.API_URL + '/project/edit', project)
    }

    delete(projectId: number): Observable<IResponseMessage> {
        return this.http.delete<IResponseMessage>(environment.API_URL + '/project/delete/' + projectId)
    }

    check(project: IProject, hasLink: boolean): number {
        if (hasLink && !checkURL(project.link)) {
            return 1
        }
        return 0
    }

    getErrorMessage(errorNumber: number): string {
        switch (errorNumber) {
            case 1:
                return "Link invalido"
            default:
                return ""
        }
    }
}
