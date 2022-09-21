import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IConfiguration } from 'src/app/models/configuration.interface'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    constructor(private readonly http: HttpClient) { }

    getByProfileId(profileId: number): Observable<IConfiguration> {
        return this.http.get<IConfiguration>(environment.API_URL + '/configuration/' + profileId)
    }

    addNew(config: IConfiguration): Observable<IConfiguration> {
        return this.http.post<IConfiguration>(environment.API_URL + '/configuration/create', config)
    }

    edit(config: IConfiguration): Observable<IConfiguration> {
        return this.http.put<IConfiguration>(environment.API_URL + '/configuration/edit', config)
    }
}
