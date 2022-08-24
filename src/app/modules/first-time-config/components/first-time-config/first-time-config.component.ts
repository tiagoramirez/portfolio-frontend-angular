import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IConfiguration } from 'src/app/models/configuration.interface';
import { IProfile } from 'src/app/models/profile.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'app-first-time-config',
    templateUrl: './first-time-config.component.html',
    styleUrls: ['./first-time-config.component.css']
})
export class FirstTimeConfigComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private profileService: ProfileService, private configurationService: ConfigurationService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.profile.userId = this.tokenService.getUserId();
        let sub: Subscription = this.profileService.getByUsername(this.username).subscribe({
            next: (data) => {
                if (data.length != 0) {
                    this.router.navigate(['/' + this.username]);
                }
            },
            error: (e) => {
                console.log(e);
                this.serverError = true;
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
                this.serverError = false;
                this.subsContainer.add(sub);
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    onSave() {
        this.loadingSubmit = true;
        const errorNumber = this.profileService.check(this.profile);
        if (errorNumber != 0) {
            this.submitError = true;
            this.loadingSubmit = false;
            this.errorMessage = this.profileService.getErrorMessage(errorNumber);
        } else {
            let subProfile: Subscription = this.profileService.addNew(this.profile).subscribe({
                next: (data) => {
                    console.log("Perfil cargado correctamente");
                    this.configuration.profileId = data.id;
                },
                error: (e) => {
                    console.log(e);
                    this.submitError = true;
                    this.loadingSubmit = false;
                    this.errorMessage = "Error en el servidor";
                },
                complete: () => {
                    this.submitError = false;
                    this.subsContainer.add(subProfile);
                    let subConfig: Subscription = this.configurationService.addNew(this.configuration).subscribe({
                        next: () => {
                            console.log("Configuracion cargada correctamente");
                        },
                        error: (e) => {
                            console.log(e);
                            this.submitError = true;
                            this.loadingSubmit = false;
                            this.errorMessage = "Error en el servidor";
                        },
                        complete: () => {
                            this.submitError = false;
                            this.loadingSubmit = false;
                            this.subsContainer.add(subConfig);
                            this.router.navigate(['/' + this.username])
                        }
                    });
                }
            });
        }
    }

    username: string;
    configuration: IConfiguration = {
        show_photo: false,
        show_banner: false,
        show_location: false,
        show_phone: false
    };
    profile: IProfile = {
        description: ''
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    loadingSubmit: boolean = false;
    serverError: boolean = false;
    submitError: boolean = false;

    errorMessage: string;
}
