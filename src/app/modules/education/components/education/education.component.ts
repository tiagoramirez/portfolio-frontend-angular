import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

    constructor(private educationService: EducationService, private descriptionService: DescriptionService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        let sub = this.educationService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.educations = data;
                this.educations.map((educ) => {
                    let subDesc: Subscription = this.descriptionService.getByProfileAndEducationId(this.profile.id, educ.id).subscribe({
                        next: (desc) => {
                            educ.description = desc.description;
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
    @Input() profile: IProfile;
    educations: IEducation[];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
