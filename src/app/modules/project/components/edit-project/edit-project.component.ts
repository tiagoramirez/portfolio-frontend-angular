import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IDescription } from 'src/app/models/description.interface';
import { IProject } from 'src/app/models/project.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private projectService:ProjectService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.projectId = this.route.snapshot.params['projectId'];
        this.profileId = this.route.snapshot.params['profileId'];
        let subProj = this.projectService.getById(this.projectId).subscribe({
            next: (data) => {
                this.project = data;
            },
            error: (err) => {
                this.loadingProject = false;
                console.error(err);
            },
            complete: () => {
                this.loadingProject = false;
                this.subsContainer.add(subProj);
            }
        });
        let subDesc = this.descriptionService.getByProfileAndProjectId(this.profileId, this.projectId).subscribe({
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
        this.project.userId = this.tokenService.getUserId();
        this.description.profileId = this.profileId;
        let subProject = this.projectService.edit(this.project).subscribe({
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
                this.subsContainer.add(subProject);
                this.router.navigate(['/' + this.username]);
            }
        });
    }

    username: string;
    projectId: number;
    profileId: number;
    project: IProject;
    description: IDescription;


    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingSubmit: boolean = false;
    loadingProject: boolean = true;
    loadingDescription: boolean = true;
}
