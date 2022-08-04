import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IPerson } from 'src/app/models/person.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

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
                            this.loading = false;
                        }
                    })
                }
                else {
                    this.error = true;
                    this.loading = false;
                }
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

}
