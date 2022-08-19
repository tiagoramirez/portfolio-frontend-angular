import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IExperience } from 'src/app/models/experience.interface';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnDestroy {

    constructor(private experienceService: ExperienceService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        let sub = this.experienceService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.experiences = data;
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

    experiences: IExperience[];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
