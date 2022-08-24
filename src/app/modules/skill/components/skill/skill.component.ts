import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUserTechnologie } from 'src/app/models/technologie.interface';
import { TechnologieService } from 'src/app/services/technologie.service';

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private technologieService: TechnologieService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];

        let sub: Subscription = this.technologieService.getAllByUsername(this.username).subscribe({
            next: (data) => {
                this.technologies = data;
            },
            error: (e) => {
                console.log(e);
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
    technologies: IUserTechnologie[] = [];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}