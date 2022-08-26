import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IDescription } from 'src/app/models/description.interface';
import { IEducation } from 'src/app/models/education.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private educationService:EducationService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.educationId = this.route.snapshot.params['educationId'];
        this.profileId = this.route.snapshot.params['profileId'];
        let subEduc = this.educationService.getById(this.educationId).subscribe({
            next: (data) => {
                this.education = data;
            },
            error: (err) => {
                this.loadingEducation = false;
                console.error(err);
            },
            complete: () => {
                this.loadingEducation = false;
                this.subsContainer.add(subEduc);
            }
        });
        let subDesc = this.descriptionService.getByProfileAndEducationId(this.profileId, this.educationId).subscribe({
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
        this.education.userId = this.tokenService.getUserId();
        this.description.profileId = this.profileId;
        let subEducation = this.educationService.edit(this.education).subscribe({
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
                this.subsContainer.add(subEducation);
                this.router.navigate(['/' + this.username]);
            }
        });
    }

    username: string;
    educationId: number;
    profileId: number;
    education: IEducation;
    description: IDescription;


    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingSubmit: boolean = false;
    loadingEducation: boolean = true;
    loadingDescription: boolean = true;

}
