import { Component, OnInit } from '@angular/core';
import { IPerson } from './models/person.interface';
import { PersonService } from './services/person.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private personService: PersonService) { }

    ngOnInit(): void {
        this.personService.getAll().subscribe((res) => {
            this.person = res[0];
            this.cargando = false;
            console.log(this.person);
        });
    }

    person: IPerson;

    cargando: boolean = true;

    // cargar(event: any) {
    //     const img = event.target.files[0];
    //     getBase64(img).then((res: any) => {
    //         this.preview = res.base;            
    //     });
    // }

    // subirArchivo(): any {
    //     const newPerson: IPerson = {
    //         full_name: "Tiago",
    //         birthday: new Date(),
    //         phone: 1112345678,
    //         mail: "tiago@yo.net",
    //         about_me: "Soy yo yeiii",
    //         photo: this.preview
    //     }
    //     const subir = JSON.parse(JSON.stringify(newPerson).trim());


    //     this.http.post<IPerson>("http://localhost:8080/personas/crear", subir).subscribe((res) => console.log(res));
    // }
}
