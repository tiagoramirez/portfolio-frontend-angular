import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/models/location.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }

    getByPersonId(personId: number): Observable<ILocation> {
        return this.http.get<ILocation>(environment.API_URL+"/direccion/"+personId);
    }
}
