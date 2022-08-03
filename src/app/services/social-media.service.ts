import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkURL } from 'src/app/helpers/checkURL';
import { ISocialMedia } from 'src/app/models/social_media.interface';
import { environment } from 'src/environments/environment';
import { IUserSocialMedia } from '../models/user_social_media.interface';

@Injectable({
    providedIn: 'root'
})
export class SocialMediaService {

    constructor(private http: HttpClient) { }

    getAllAvailable(): Observable<ISocialMedia[]> {
        return this.http.get<ISocialMedia[]>(environment.API_URL + "/redes-sociales/todas");
    }

    getAllByPersonId(personId: number): Observable<IUserSocialMedia[]> {
        return this.http.get<IUserSocialMedia[]>(environment.API_URL + "/redes-sociales/" + personId);
    }

    getById(id: number): Observable<IUserSocialMedia> {
        return this.http.get<IUserSocialMedia>(environment.API_URL + "/redes-sociales?id=" + id);
    }

    addNew(sm: IUserSocialMedia): Observable<IUserSocialMedia> {
        return this.http.post<IUserSocialMedia>(environment.API_URL + "/redes-sociales/crear", sm);
    }

    edit(sm: IUserSocialMedia): Observable<IUserSocialMedia> {
        return this.http.put<IUserSocialMedia>(environment.API_URL + "/redes-sociales/editar", sm);
    }

    delete(id: number): Observable<IUserSocialMedia> {
        return this.http.delete<IUserSocialMedia>(environment.API_URL + "/redes-sociales/borrar/" + id);
    }

    check(sm: IUserSocialMedia): number {
        sm.link=checkURL(sm.link);
        if (sm.link.length > 255) {
            return 1;
        }
        if (sm.link.length == 0 || sm.link === null || sm.link === undefined) {
            return 2;
        }
        return 0;
    }

    getErrorMessage(error: number): string {
        switch (error) {
            case 1: return "El link no puede tener mas de 255 caracteres.";
            case 2: return "El link no fue ingresado o no es valido.";
            case 0: return "";
        }
        return "";
    }
}
