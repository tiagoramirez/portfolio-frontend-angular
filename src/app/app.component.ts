import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { getBase64 } from './helpers/getBase64';
import { IPerson } from './models/person.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private http: HttpClient) { }
    preview: string;

    cargar(event: any) {
        const img = event.target.files[0];
        getBase64(img).then((res: any) => {
            this.preview = res.base;            
        });
    }

    subirArchivo(): any {
        const newPerson: IPerson = {
            full_name: "Tiago",
            birthday: new Date(),
            phone: 1112345678,
            mail: "tiago@yo.net",
            about_me: "Soy yo yeiii",
            photo: this.preview
        }
        const subir = JSON.parse(JSON.stringify(newPerson).trim());


        this.http.post<IPerson>("http://localhost:8080/personas/crear", subir).subscribe((res) => console.log(res));
    }
}
