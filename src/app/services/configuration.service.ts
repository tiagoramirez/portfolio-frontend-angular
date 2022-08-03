import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<IConfiguration> {
        return this.http.get<IConfiguration>(environment.API_URL + "/configuracion/" + id);
    }

    edit(config: IConfiguration): Observable<IConfiguration> {
        return this.http.put<IConfiguration>(environment.API_URL + '/configuracion/editar', config);
    }
}
