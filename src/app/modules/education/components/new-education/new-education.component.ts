import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
import { AppSettings } from 'src/app/helpers/appSettings';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IDescription } from 'src/app/models/description.interface';
import { IEducation } from 'src/app/models/education.interface';
import { DescriptionService } from 'src/app/services/description.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
    selector: 'app-new-education',
    templateUrl: './new-education.component.html',
    styleUrls: ['./new-education.component.css']
})
export class NewEducationComponent implements OnInit {

    constructor(private route: ActivatedRoute, private tokenService: TokenService, private educationService: EducationService, private descriptionService: DescriptionService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.profileId = this.route.snapshot.params['profileId'];
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    save() {
        this.isErrorLoadingNewData = false;
        this.loadingNewData = true;
        let subExperience = this.educationService.addNew(this.education).subscribe({
            next: (data) => {
                this.description.profileId = this.profileId;
                this.description.educationId = data.id;
                let subDescription = this.descriptionService.addNew(this.description).subscribe({
                    error: (err) => {
                        if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                            this.errorMessageLoadingNewData = err.error.message;
                        }
                        else {
                            this.errorMessageLoadingNewData = AppSettings.serverErrorMessage;
                        }
                        this.isErrorLoadingNewData = true;
                        this.loadingNewData = false;
                    },
                    complete: () => {
                        this.loadingNewData = false;
                        this.subsContainer.add(subDescription);
                        this.router.navigate(['/' + this.username]);
                    }
                });
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled == true) {
                    this.errorMessageLoadingNewData = err.error.message;
                }
                else {
                    this.errorMessageLoadingNewData = AppSettings.serverErrorMessage;
                }
                this.isErrorLoadingNewData = true;
                this.loadingNewData = false;
            },
            complete: () => {
                this.subsContainer.add(subExperience);
            }
        });
    }

    username: string;
    profileId: number;
    education: IEducation = {
        userId: this.tokenService.getUserId(),
        type: '',
        title_name: '',
        institute_name: '',
        isActual: false,
        start_date: undefined,
        end_date: undefined
    }

    description: IDescription = {
        profileId: 0,
        educationId: 0,
        description: ''
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingNewData: boolean = false;
    errorMessageLoadingNewData: string = '';
    isErrorLoadingNewData: boolean = false;
}