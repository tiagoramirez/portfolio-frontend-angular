import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IProfile } from 'src/app/models/person.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService, private configService: ConfigurationService) { }

    ngOnInit(): void {
        this.personId = this.route.snapshot.params['id'];
        let subPerson = this.profileService.getById(this.personId).subscribe({
            next: (p) => {
                this.person = p;
                this.loadingPerson = false;
            },
            error: (e) => {
                this.error = true;
                this.loadingPerson = false;
                console.error(e);
            },
            complete: () => {
                this.subsContainer.add(subPerson);
            }
        });
        let subConfig = this.configService.getById(this.personId).subscribe({
            next: (c) => {
                this.config = c;
                this.loadingConfig = false;
            },
            error: (e) => {
                console.log(e);
                this.error = true;
                this.loadingConfig = false;
            },
            complete: () => {
                this.subsContainer.add(subConfig);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    personId: number;
    person: IProfile;

    config: IConfiguration;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingPerson: boolean = true;
    loadingConfig: boolean = true;
    error: boolean = false;

    loadingNewConfig: boolean = false;

    saveConfig() {
        this.loadingNewConfig = true;
        let subConfig = this.configService.edit(this.config).subscribe({
            next: (c) => {
                console.log("Configuracion cargada correctamente");
                console.log(c);
                this.loadingNewConfig = false;
            },
            error: (e) => {
                console.error(e);
                this.loadingNewConfig = false;
            },
            complete: () => {
                this.subsContainer.add(subConfig);
            }
        });
    }

    savePerson() {
        let subPerson = this.profileService.edit(this.person).subscribe({
            next: (p) => {
                console.log("Datos cargados correctamente");
                console.log(p);
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => {
                this.subsContainer.add(subPerson);
                this.router.navigate(['.']);
            }
        });
    }
}
