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
                    this.cargando = false;
                }
                else {
                    this.error = true;
                }
            },
            error: (e) => {
                this.error = true;
                console.error(e);
            },
            complete: () => {
                this.subsContainer.add(sub);
            }
        });




        this.modal = document.getElementById("myModal");

        // Get the button that opens the modal
        this.btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        this.span = document.getElementsByClassName("close")[0];
    };

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }
    person: IPerson;

    cargando: boolean = true;
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


    modal: any;
    btn: any;
    span: any;

    // When the user clicks on the button, open the modal
    btnclick = function () {
        this.modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    spanclick = function () {
        this.modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    windowclick = function (event) {
        if (event.target == this.modal) {
            this.modal.style.display = "none";
        }
    }
}
