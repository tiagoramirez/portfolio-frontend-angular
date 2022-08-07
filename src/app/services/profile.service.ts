import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConfiguration } from '../models/configuration.interface';
import { IProfile } from '../models/profile.interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) { }

    getByUsername(username: string): Observable<IProfile[]> {
        return this.http.get<IProfile[]>(environment.API_URL + "/profile/" + username);
    }

    getById(id: number): Observable<IProfile> {
        return this.http.get<IProfile>(environment.API_URL + '/profile?id=' + id);
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

    check(profile: IProfile, configuration?: IConfiguration): number {
        if (profile.description.length == 0 || profile.description === null || profile.description === undefined) return 1;
        if (profile.description.length > 100) return 2;

        if (configuration) {
            if (configuration.show_location && (profile.location_country === undefined || profile.location_country === null || profile.location_country === '')) return 3;
            if (configuration.show_location && profile.location_country.length > 50) return 4;
            if (configuration.show_location && (profile.location_state === undefined || profile.location_state === null || profile.location_state === '')) return 5;
            if (configuration.show_location && profile.location_state.length > 50) return 6;
            if (configuration.show_phone && (profile.phone === undefined || profile.phone === null || profile.phone === '')) return 7;
            if (configuration.show_phone && profile.phone.length > 16) return 8;
        }
        return 0;
    }

    getErrorMessage(error: number): string {
        switch (error) {
            case 1: return "La descripcion no fue ingresada.";
            case 2: return "La descripcion no puede tener mas de 100 caracteres.";
            case 3: return "El pais no fue ingresado.";
            case 4: return "El pais no puede tener mas de 50 caracteres.";
            case 5: return "El estado no fue ingresado.";
            case 6: return "El estado no puede tener mas de 50 caracteres.";
            case 7: return "El telefono no fue ingresado.";
            case 8: return "El telefono no puede tener mas de 16 caracteres.";
            case 0: return "";
        }
        return "";
    }
}