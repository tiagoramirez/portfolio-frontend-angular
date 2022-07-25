import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';

@Injectable({
    providedIn: 'root'
})
export class SocialMediaService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<IMySocialMedia[]> {
        return this.http.get<IMySocialMedia[]>("http://localhost:8080/redes-sociales");
    }
}
