import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
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
            },
            error: (err) => {
                this.loadingExperience = false;
                console.error(err);
            },
            complete: () => {
                this.loadingExperience = false;
                this.subsContainer.add(subExp);
            }
        });
        let subDesc = this.descriptionService.getByProfileAndExperienceId(this.profileId, this.experienceId).subscribe({
            next: (data) => {
                this.description = data;
            },
            error: (err) => {
                this.loadingDescription = false;
                console.error(err);
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
        this.experience.userId = this.tokenService.getUserId();
        this.description.profileId = this.profileId;
        let subExperience = this.experienceService.edit(this.experience).subscribe({
            next: () => {
                let subDescription = this.descriptionService.edit(this.description).subscribe({
                    next(value) {
                        console.log(value);
                    },
                    error(err) {
                        console.error(err);
                    },
                    complete: () => {
                        this.subsContainer.add(subDescription);
                    }
                });
            },
            error(err) {
                console.error(err);
            },
            complete: () => {
                this.subsContainer.add(subExperience);
                this.router.navigate(['/' + this.username]);
            }
        });
    }

    username: string;
    experienceId: number;
    profileId: number;
    experience: IExperience;
    description: IDescription;


    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingSubmit: boolean = false;
    loadingExperience: boolean = true;
    loadingDescription: boolean = true;
}
