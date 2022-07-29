import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/models/person.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<IPerson> {
        return this.http.get<IPerson>(environment.API_URL + "/personas/" + id);
    }
}
