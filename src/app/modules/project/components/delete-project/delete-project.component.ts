import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { DescriptionService } from 'src/app/services/description.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-delete-project',
    templateUrl: './delete-project.component.html',
    styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

    constructor(private route: ActivatedRoute, private projectService:ProjectService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.projectId = this.route.snapshot.params['projectId'];
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    delete() {
        let subDes = this.descriptionService.deleteProjectDescription(this.projectId).subscribe({
            next: (value) => {
                console.log(value);
                let subProj = this.projectService.delete(this.projectId).subscribe({
                    next(value) {
                        console.log(value);
                    },
                    error(err) {
                        console.error(err);
                    },
                    complete: () => {
                        this.subsContainer.add(subProj);
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
    projectId: number;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}