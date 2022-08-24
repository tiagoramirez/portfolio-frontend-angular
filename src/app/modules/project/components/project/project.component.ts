import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IProfile } from 'src/app/models/profile.interface';
import { IProject } from 'src/app/models/project.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

    constructor(private projectService: ProjectService, private descriptionService: DescriptionService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.username = this.route.snapshot.params['username'];
        let sub = this.projectService.getByUsername(this.username).subscribe({
            next: (data) => {
                this.projects = data;
                this.projects.map((proj) => {
                    let subDesc: Subscription = this.descriptionService.getByProfileAndProjectId(this.profiles[0].id, proj.id).subscribe({
                        next: (desc) => {
                            proj.description = desc.description;
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
    projects: IProject[];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

}
