import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class FirstTimeConfigComponent implements OnInit {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private profileService: ProfileService, private configurationService: ConfigurationService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.profile.userId = this.tokenService.getUserId();
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    onSave() {        
        let subProfile: Subscription = this.profileService.addNew(this.profile).subscribe({
            next: (data) => {
                console.log("Perfil cargado correctamente");
                this.configuration.profileId = data.id;
            },
            error: (e) => {
                console.log(e);
                this.error = true;
                this.loading = false;
            },
            complete: () => {
                this.error = false;
                this.subsContainer.add(subProfile);
                let subConfig: Subscription = this.configurationService.addNew(this.configuration).subscribe({
                    next: () => {
                        console.log("Configuracion cargada correctamente");
                    },
                    error: (e) => {
                        console.log(e);
                        this.error = true;
                        this.loading = false
                    },
                    complete: () => {
                        this.error = false;
                        this.loading = false;
                        this.subsContainer.add(subConfig);
                    }
                });
            }
        });
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

    loading: boolean = false;
    error: boolean = false;
}
