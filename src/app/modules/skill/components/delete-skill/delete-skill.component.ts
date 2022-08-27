import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-delete-skill',
  templateUrl: './delete-skill.component.html',
  styleUrls: ['./delete-skill.component.css']
})
export class DeleteSkillComponent implements OnInit {

    constructor(private route: ActivatedRoute, private skillService:SkillService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.userSkillsId = this.route.snapshot.params['userSkillsId'];
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    delete() {
        let sub = this.skillService.delete(this.userSkillsId).subscribe({
            next: (value) => {
                console.log(value);
            },
            error(err) {
                console.error(err);
            },
            complete: () => {
                this.subsContainer.add(sub);
                this.router.navigate([this.username]);
            }
        });
    }

    username: string;
    userSkillsId: number;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();
}
