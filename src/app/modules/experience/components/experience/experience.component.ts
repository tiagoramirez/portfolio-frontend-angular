import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IExperience } from 'src/app/models/experience.interface';
import { IProfile } from 'src/app/models/profile.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {

    constructor(private tokenService: TokenService, private experienceService: ExperienceService, private descriptionService: DescriptionService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        if (this.tokenService.getToken()) {
            this.loggedUsername = this.tokenService.getUsername();
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }
        let sub = this.experienceService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.experiences = data;
                this.experiences.map((exp) => {
                    let subDesc: Subscription = this.descriptionService.getByProfileAndExperienceId(this.profile.id, exp.id).subscribe({
                        next: (desc) => {
                            exp.description = desc.description;
                        },
                        error: (error) => {
                            console.error(error);
                        },
                        complete: () => {
                            this.subsContainer.add(subDesc);
                        }
                    });
                });
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {
                this.subsContainer.add(sub);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    username: string;
    loggedUsername: string;
    @Input() profile: IProfile;
    experiences: IExperience[];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    isLogged: boolean;
}
