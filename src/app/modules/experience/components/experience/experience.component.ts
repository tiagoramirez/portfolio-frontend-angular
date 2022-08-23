import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

    constructor(private experienceService: ExperienceService, private descriptionService: DescriptionService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        let sub = this.experienceService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.experiences = data;
                this.experiences.map((exp) => {
                    let subDesc: Subscription = this.descriptionService.getByProfileAndExperienceId(this.profiles[0].id, exp.id).subscribe({
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
    @Input() profiles: IProfile[];
    experiences: IExperience[];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
