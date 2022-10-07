import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IPhoto } from 'src/app/models/photo.interface'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    constructor(private readonly http: HttpClient) { }

    getByUsername(username: string): Observable<IPhoto> {
        return this.http.get<IPhoto>(environment.API_URL + '/photo/get/' + username)
    }

    addNew(image: File, userId: number): Observable<IPhoto> {
        const uploadData = new FormData()
        uploadData.append('photo', image, image.name)
        return this.http.post<IPhoto>(environment.API_URL + '/photo/add/' + userId, uploadData)
    }

    edit(image: File, userId: number, photoId: number): Observable<IPhoto> {
        const uploadData = new FormData()
        uploadData.append('photo', image, image.name)
        return this.http.put<IPhoto>(environment.API_URL + '/photo/edit/' + userId + '/' + photoId, uploadData)
    }
}
