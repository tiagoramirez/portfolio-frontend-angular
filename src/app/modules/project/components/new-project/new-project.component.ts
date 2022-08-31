import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IDescription } from 'src/app/models/description.interface';
import { IProject } from 'src/app/models/project.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private projectService: ProjectService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.profileId = this.route.snapshot.params['profileId'];
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    save() {
        let subProj = this.projectService.addNew(this.project).subscribe({
            next: (data) => {
                console.log(data);
                
                this.description.profileId = this.profileId;
                this.description.projectId = data.id;
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
                this.subsContainer.add(subProj);
                this.router.navigate(['/' + this.username]);
            }
        });
    }

    username: string;
    profileId: number;
    project:IProject={
        userId: this.tokenService.getUserId(),
        name: '',
        link: ''
    }
    description: IDescription = {
        profileId: 0,
        projectId: 0,
        description: ''
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    loadingSubmit: boolean = false;

}