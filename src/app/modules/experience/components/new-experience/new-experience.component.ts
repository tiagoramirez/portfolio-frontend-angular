import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IDescription } from 'src/app/models/description.interface';
import { IExperience } from 'src/app/models/experience.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
    selector: 'app-new-experience',
    templateUrl: './new-experience.component.html',
    styleUrls: ['./new-experience.component.css']
})
export class NewExperienceComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private experienceService: ExperienceService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.profileId = this.route.snapshot.params['profileId'];
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    save() {
        let subExperience = this.experienceService.addNew(this.experience).subscribe({
            next: (data) => {
                this.description.profileId = this.profileId;
                this.description.experienceId = data.id;
                let subDescription = this.descriptionService.addNew(this.description).subscribe({
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
    profileId: number;
    experience: IExperience = {
        userId: this.tokenService.getUserId(),
        position: '',
        type: '',
        company_name: '',
        location: '',
        isActual: false,
        start_date: undefined,
        end_date: undefined
    }
    description: IDescription = {
        profileId: 0,
        experienceId: 0,
        description: ''
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    loadingSubmit: boolean = false;
}
