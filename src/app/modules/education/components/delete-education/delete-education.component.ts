import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { DescriptionService } from 'src/app/services/description.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
    selector: 'app-delete-education',
    templateUrl: './delete-education.component.html',
    styleUrls: ['./delete-education.component.css']
})
export class DeleteEducationComponent implements OnInit,OnDestroy {

    constructor(private route: ActivatedRoute, private educationService: EducationService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.educationId = this.route.snapshot.params['educationId'];
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    delete() {
        let subDes = this.descriptionService.deleteEducationDescription(this.educationId).subscribe({
            next: (value) => {
                console.log(value);
                let subExp = this.educationService.delete(this.educationId).subscribe({
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
    educationId: number;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

}
