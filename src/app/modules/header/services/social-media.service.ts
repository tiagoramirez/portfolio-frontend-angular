import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SocialMediaService {

    constructor(private http: HttpClient) { }

    getAllByPersonId(personId: number): Observable<IMySocialMedia[]> {
        return this.http.get<IMySocialMedia[]>(environment.API_URL + "/redes-sociales/" + personId);
    }
}