import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppSettings } from 'src/app/helpers/appSettings';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IDescription } from 'src/app/models/description.interface';
import { IExperience } from 'src/app/models/experience.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
    selector: 'app-edit-experience',
    templateUrl: './edit-experience.component.html',
    styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private experienceService: ExperienceService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.experienceId = this.route.snapshot.params['experienceId'];
        this.profileId = this.route.snapshot.params['profileId'];
        let subExp = this.experienceService.getById(this.experienceId).subscribe({
            next: (data) => {
                this.experience = data;
                this.experience.userId = this.tokenService.getUserId();
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = AppSettings.serverErrorMessage;
                }
                this.isError = true;
                this.loadingExperience = false;
            },
            complete: () => {
                this.loadingExperience = false;
                this.subsContainer.add(subExp);
            }
        });
        let subDesc = this.descriptionService.getByProfileAndExperienceId(this.profileId, this.experienceId).subscribe({
            next: (data) => {
                this.description = data;
                this.description.profileId = this.profileId;
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = AppSettings.serverErrorMessage;
                }
                this.isError = true;
                this.loadingDescription = false;
            },
            complete: () => {
                this.loadingDescription = false;
                this.subsContainer.add(subDesc);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    save() {
        this.isErrorLoadingNewData = false;
        this.loadingNewData = true;
        let subExperience = this.experienceService.edit(this.experience).subscribe({
            next: () => {
                let subDescription = this.descriptionService.edit(this.description).subscribe({
                    error(err) {
                        if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                            this.errorMessageLoadingNewData = err.error.message;
                        }
                        else {
                            this.errorMessageLoadingNewData = AppSettings.serverErrorMessage;
                        }
                        this.isErrorLoadingNewData = true;
                        this.loadingNewData = false;
                    },
                    complete: () => {
                        this.loadingNewData = false;
                        this.subsContainer.add(subDescription);
                        this.router.navigate(['/' + this.username]);
                    }
                });
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessageLoadingNewData = err.error.message;
                }
                else {
                    this.errorMessageLoadingNewData = AppSettings.serverErrorMessage;
                }
                this.isErrorLoadingNewData = true;
                this.loadingNewData = false;
            },
            complete: () => {
                this.subsContainer.add(subExperience);
            }
        });
    }

    username: string;
    experienceId: number;
    profileId: number;
    experience: IExperience;
    description: IDescription;


    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingDescription: boolean = true;
    loadingExperience: boolean = true;
    errorMessage: string = '';
    isError: boolean = false;

    loadingNewData: boolean = false;
    errorMessageLoadingNewData: string = '';
    isErrorLoadingNewData: boolean = false;
}