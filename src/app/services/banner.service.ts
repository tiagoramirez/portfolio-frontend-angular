import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBanner } from 'src/app/models/banner.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BannerService {

    constructor(private http: HttpClient) { }

    addNew(image: File): Observable<IBanner> {
        const uploadData = new FormData();
        uploadData.append('banner', image, image.name);
        return this.http.post<IBanner>(environment.API_URL + '/fondo/crear', uploadData);
    }

    getById(id: number): Observable<IBanner> {
        return this.http.get<IBanner>(environment.API_URL + '/fondo/' + id);
    }
}
