import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from './helpers/subscriptionContainer';
import { IPerson } from './models/person.interface';
import { PersonService } from './services/person.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private personService: PersonService) { }

    ngOnInit(): void {
        let sub: Subscription = this.personService.getById(1).subscribe({
            next: (v) => {
                if (v !== undefined && v !== null) {
                    this.person = v;                    
                }
                else {
                    this.error = true;
                }
                this.loading = false;
            },
            error: (e) => {
                this.error = true;
                console.error(e);
                this.loading = false;
            },
            complete: () => {                
                this.subsContainer.add(sub);
            }
        });
    };

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }
    person: IPerson;

    loading: boolean = true;
    error: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

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
