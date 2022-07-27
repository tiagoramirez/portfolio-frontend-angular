import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPerson } from '../models/person.interface';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<IPerson> {
        return this.http.get<IPerson>(environment.API_URL + "/personas/" + id);
    }
}
