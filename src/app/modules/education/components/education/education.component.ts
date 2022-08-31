import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppSettings } from 'src/app/helpers/appSettings';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IEducation } from 'src/app/models/education.interface';
import { IProfile } from 'src/app/models/profile.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnDestroy {

    constructor(private educationService: EducationService, private tokenService: TokenService, private descriptionService: DescriptionService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        if (this.tokenService.getToken()) {
            this.loggedUsername = this.tokenService.getUsername();
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }
        let sub = this.educationService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.educations = data;
                this.educations.map((educ) => {
                    let subDesc: Subscription = this.descriptionService.getByProfileAndEducationId(this.profile.id, educ.id).subscribe({
                        next: (desc) => {
                            this.loading = true;
                            educ.description = desc.description;
                        },
                        error: (err) => {
                            if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                                this.errorMessage = err.error.message;
                            }
                            else {
                                this.errorMessage = AppSettings.serverErrorMessage;
                            }
                            this.isError = true;
                            this.loading = false;
                        },
                        complete: () => {
                            this.loading = false;
                            this.subsContainer.add(subDesc);
                        }
                    });
                });
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = AppSettings.serverErrorMessage;
                }
                this.isError = true;
                this.loading = false;
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
    @Input() profile: IProfile;
    educations: IEducation[];
    loggedUsername: string;
    isLogged: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    errorMessage: string = '';
    isError: boolean = false;
}
