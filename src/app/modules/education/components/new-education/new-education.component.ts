import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/services/token.service';
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
        let subExperience = this.educationService.addNew(this.education).subscribe({
            next: (data) => {
                this.description.profileId = this.profileId;
                this.description.educationId = data.id;
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
                this.subsContainer.add(subExperience);
                this.router.navigate(['/' + this.username]);
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
        end_date: undefined,
        description: ''
    }
        
    description: IDescription = {
        profileId: 0,
        educationId: 0,
        description: ''
    }

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    loadingSubmit: boolean = false;

}
