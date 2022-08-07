import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IProfile } from 'src/app/models/profile.interface';
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
        this.username = this.route.snapshot.params['username'];
        this.profileId = this.route.snapshot.params['profileId'];
        let subPerson = this.profileService.getById(this.profileId).subscribe({
            next: (p) => {
                this.profile = p;
            },
            error: (e) => {
                this.error = true;
                this.loadingProfile = false;
                console.error(e);
            },
            complete: () => {
                this.error = false;
                this.loadingProfile = false;
                this.subsContainer.add(subPerson);
                let subConfig = this.configService.getByProfileId(this.profile.id).subscribe({
                    next: (c) => {
                        this.config = c;
                    },
                    error: (e) => {
                        console.log(e);
                        this.error = true;
                        this.loadingConfig = false;
                    },
                    complete: () => {
                        this.error = false;
                        this.loadingConfig = false;
                        this.subsContainer.add(subConfig);
                    }
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    saveConfig() {
        this.loadingNewConfig = true;
        let subConfig = this.configService.edit(this.config).subscribe({
            next: () => {
                console.log("Configuracion cargada correctamente");
            },
            error: (e) => {
                console.error(e);
                this.loadingNewConfig = false;
            },
            complete: () => {
                this.loadingNewConfig = false;
                this.subsContainer.add(subConfig);
            }
        });
    }

    saveProfile() {
        this.loadingNewProfile = true;
        let subProfile = this.profileService.edit(this.profile).subscribe({
            next: () => {
                console.log("Datos cargados correctamente");
            },
            error: (e) => {
                console.error(e);
                this.loadingNewProfile = false;
            },
            complete: () => {
                this.subsContainer.add(subProfile);
                this.loadingNewProfile = false;
                this.router.navigate(['.']);
            }
        });
    }

    username: string;
    profileId: number;
    profile: IProfile;
    config: IConfiguration;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingProfile: boolean = true;
    loadingConfig: boolean = true;
    error: boolean = false;

    loadingNewConfig: boolean = false;
    loadingNewProfile: boolean = false;
}
