import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConfiguration } from '../models/configuration.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<IConfiguration> {
        return this.http.get<IConfiguration>(environment.API_URL + "/configuracion/" + id);
    }
}
