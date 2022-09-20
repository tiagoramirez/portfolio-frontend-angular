import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IBanner } from 'src/app/models/banner.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor (private readonly http: HttpClient) { }

  getByUsername (username: string): Observable<IBanner> {
    return this.http.get<IBanner>(environment.API_URL + '/banner/' + username)
  }

  addNew (image: File, userId: number): Observable<IBanner> {
    const uploadData = new FormData()
    uploadData.append('banner', image, image.name)
    return this.http.post<IBanner>(environment.API_URL + '/banner/add/' + String(userId), uploadData)
  }

  edit (image: File, userId: number, bannerId: number): Observable<IBanner> {
    const uploadData = new FormData()
    uploadData.append('banner', image, image.name)
    return this.http.put<IBanner>(environment.API_URL + '/banner/edit/' + String(userId) + '/' + String(bannerId), uploadData)
  }
}
