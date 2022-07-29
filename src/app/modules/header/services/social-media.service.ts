import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkURL } from 'src/app/helpers/checkURL';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';
import { ISocialMedia } from 'src/app/models/social_media.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SocialMediaService {

    constructor(private http: HttpClient) { }

    getAllAvailable(): Observable<ISocialMedia[]> {
        return this.http.get<ISocialMedia[]>(environment.API_URL + "/redes-sociales/todas");
    }

    getAllByPersonId(personId: number): Observable<IMySocialMedia[]> {
        return this.http.get<IMySocialMedia[]>(environment.API_URL + "/redes-sociales/" + personId);
    }

    getById(id: number): Observable<IMySocialMedia> {
        return this.http.get<IMySocialMedia>(environment.API_URL + "/redes-sociales?id=" + id);
    }

    addNew(sm: IMySocialMedia): Observable<IMySocialMedia> {
        return this.http.post<IMySocialMedia>(environment.API_URL + "/redes-sociales/crear", sm);
    }

    edit(sm: IMySocialMedia): Observable<IMySocialMedia> {
        return this.http.put<IMySocialMedia>(environment.API_URL + "/redes-sociales/editar", sm);
    }

    delete(id: number): Observable<IMySocialMedia> {
        return this.http.delete<IMySocialMedia>(environment.API_URL + "/redes-sociales/borrar/" + id);
    }

    check(sm: IMySocialMedia): number {
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
