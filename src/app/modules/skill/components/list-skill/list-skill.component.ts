import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IUserSkills } from 'src/app/models/skill.interface'
import { SkillService } from 'src/app/services/skill.service'

@Component({
    selector: 'app-list-skill',
    templateUrl: './list-skill.component.html',
    styleUrls: ['./list-skill.component.css']
})
export class ListSkillComponent implements OnInit, OnDestroy {
    constructor(private readonly skillService: SkillService, private readonly route: ActivatedRoute) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']

        const sub: Subscription = this.skillService.getAllByUsername(this.username).subscribe({
            next: (data) => {
                this.skills = data
            },
            error: (e) => {
                this.loading = false
                this.error = true
                console.error(e)
            },
            complete: () => {
                this.loading = false
                this.error = false
                this.subsContainer.add(sub)
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    username: string
    skills: IUserSkills[] = []

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    error: boolean = false
}
