import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { DescriptionService } from 'src/app/services/description.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
    selector: 'app-delete-experience',
    templateUrl: './delete-experience.component.html',
    styleUrls: ['./delete-experience.component.css']
})
export class DeleteExperienceComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private experienceService: ExperienceService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.experienceId = this.route.snapshot.params['experienceId'];
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    delete() {
        let subDes = this.descriptionService.deleteExperienceDescription(this.experienceId).subscribe({
            next: (value) => {
                console.log(value);
                let subExp = this.experienceService.delete(this.experienceId).subscribe({
                    next(value) {
                        console.log(value);
                    },
                    error(err) {
                        console.error(err);
                    },
                    complete: () => {
                        this.subsContainer.add(subExp);
                        this.router.navigate([this.username]);
                    }
                });
            },
            error(err) {
                console.error(err);
            },
            complete: () => {
                this.subsContainer.add(subDes);
            }
        });
    }

    username: string;
    experienceId: number;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
