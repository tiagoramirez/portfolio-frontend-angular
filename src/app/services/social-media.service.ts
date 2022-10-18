/* eslint-disable indent */
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { checkURL } from '../helpers/checkURL'
import { ISocialMedia, IUserSocialMedia } from '../models/social_media.interface'

@Injectable({
    providedIn: 'root'
})
export class SocialMediaService {
    constructor(private readonly http: HttpClient) { }

    getAll(): Observable<ISocialMedia[]> {
        return this.http.get<ISocialMedia[]>(environment.API_URL + '/social-media/all')
    }

    getAllByUsername(username: string): Observable<IUserSocialMedia[]> {
        return this.http.get<IUserSocialMedia[]>(environment.API_URL + '/social-media/get/' + username)
    }

    getById(usmId: number): Observable<IUserSocialMedia> {
        return this.http.get<IUserSocialMedia>(environment.API_URL + '/social-media?usmId=' + usmId)
    }

    addNew(sm: IUserSocialMedia): Observable<IUserSocialMedia> {
        return this.http.post<IUserSocialMedia>(environment.API_URL + '/social-media/add', sm)
    }

    edit(sm: IUserSocialMedia): Observable<IUserSocialMedia> {
        return this.http.put<IUserSocialMedia>(environment.API_URL + '/social-media/edit', sm)
    }

    delete(usmId: number): Observable<IUserSocialMedia> {
        return this.http.delete<IUserSocialMedia>(environment.API_URL + '/social-media/delete/' + usmId)
    }

    check(socialMedia: IUserSocialMedia): number {
        if (!checkURL(socialMedia.link)) {
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
