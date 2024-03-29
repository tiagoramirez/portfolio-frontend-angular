import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ISkill, IUserSkills } from '../models/skill.interface'

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    constructor(private readonly http: HttpClient) { }

    getAll(): Observable<ISkill[]> {
        return this.http.get<ISkill[]>(environment.API_URL + '/skill/all')
    }

    getAllByUsername(username: string): Observable<IUserSkills[]> {
        return this.http.get<IUserSkills[]>(environment.API_URL + '/skill/get/' + username)
    }

    getById(userSkillsId: number): Observable<IUserSkills> {
        return this.http.get<IUserSkills>(environment.API_URL + "/skill?userSkillsId=" + userSkillsId);
    }

    addNew(userSkill: IUserSkills): Observable<IUserSkills> {
        return this.http.post<IUserSkills>(environment.API_URL + '/skill/add', userSkill)
    }

    edit(userSkill: IUserSkills): Observable<IUserSkills> {
        return this.http.put<IUserSkills>(environment.API_URL + '/skill/edit', userSkill)
    }

    delete(userSkillId: number): Observable<IUserSkills> {
        return this.http.delete<IUserSkills>(environment.API_URL + '/skill/delete/' + userSkillId)
    }
}
