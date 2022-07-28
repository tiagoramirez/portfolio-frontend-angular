import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from './helpers/subscriptionContainer';
import { IConfiguration } from './models/configuration.interface';
import { IPerson } from './models/person.interface';
import { ConfigurationService } from './services/configuration.service';
import { PersonService } from './services/person.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private personService: PersonService, private configurationService: ConfigurationService) { }

    ngOnInit(): void {
        let sub: Subscription = this.personService.getById(1).subscribe({
            next: (p) => {
                if (p !== undefined && p !== null) {
                    this.person = p;
                    let subConfiguration: Subscription = this.configurationService.getById(this.person.id).subscribe({
                        next: (c) => {
                            if (c !== undefined && c !== null) {
                                this.configuration = c;
                                this.configLoaded = true;
                            } else {
                                this.configLoaded = false;
                            }
                        },
                        error: (e) => {
                            this.error = true;
                            console.error(e);
                        },
                        complete: () => {
                            this.subsContainer.add(subConfiguration);
                        }
                    })
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
    configuration: IConfiguration;

    loading: boolean = true;
    error: boolean = false;

    configLoaded: boolean = false;

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
