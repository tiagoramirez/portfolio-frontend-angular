import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { ISkill, IUserSkills } from 'src/app/models/skill.interface';
import { SkillService } from 'src/app/services/skill.service';

@Component({
    selector: 'app-new-skill',
    templateUrl: './new-skill.component.html',
    styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private skillService: SkillService, private router: Router, private tokenService: TokenService) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        let sub: Subscription = this.skillService.getAll().subscribe({
            next: (data) => {
                this.all_skills = data;
            },
            error: (e) => {
                this.loading = false;
                console.error(e);
            },
            complete: () => {
                this.loading = false;
                this.subsContainer.add(sub);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    onSubmit() {
        this.loadingSubmit = true;

        let sub = this.skillService.addNew(this.user_skill).subscribe({
            next: () => {
                console.log("Subido correctamente");
            },
            error: (e) => {
                this.loadingSubmit = false;
                console.error(e);
            },
            complete: () => {
                this.loadingSubmit = false;
                this.subsContainer.add(sub);
                this.router.navigate(['/' + this.username]);
            }
        });
    }

    username: string;
    user_skill: IUserSkills = {
        userId : this.tokenService.getUserId(),
        id_skill: 0,
        percentage: 0
    }
    all_skills: ISkill[];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    loadingSubmit: boolean = false;

}
