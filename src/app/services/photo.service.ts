import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from 'src/app/models/photo.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    constructor(private http: HttpClient) { }

    addNew(image: File): Observable<IPhoto> {
        const uploadData = new FormData();
        uploadData.append('photo', image, image.name);
        return this.http.post<IPhoto>(environment.API_URL + '/foto/crear', uploadData);
    }

    getById(id: number): Observable<IPhoto> {
        return this.http.get<IPhoto>(environment.API_URL + '/foto/' + id);
    }
}
