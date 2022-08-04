import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfile } from '../models/person.interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) { }

    getByUserId(userId: number): Observable<IProfile[]> {
        return this.http.get<IProfile[]>(environment.API_URL + "/profile/" + userId);
    }

    addNew(profile: IProfile): Observable<IProfile> {
        return this.http.post<IProfile>(environment.API_URL + '/profile/add', profile);
    }

    edit(profile: IProfile): Observable<IProfile> {
        return this.http.put<IProfile>(environment.API_URL + '/profile/edit', profile);
    }

    delete(profileId: number): Observable<IProfile> {
        return this.http.delete<IProfile>(environment.API_URL + '/profile/delete/' + profileId);
    }
}
