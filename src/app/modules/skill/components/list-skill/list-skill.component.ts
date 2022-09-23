import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { AppSettings } from 'src/app/helpers/appSettings'
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
                this.isEmpty = this.skills.length === 0
            },
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessage = err.error.message
                } else {
                    this.errorMessage = AppSettings.serverErrorMessageSection
                }
                this.isError = true
                this.loading = false
            },
            complete: () => {
                this.loading = false
                this.subsContainer.add(sub)
            }
        })
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    username: string
    skills: IUserSkills[] = []
    isEmpty: boolean
    emptyMessage: string = AppSettings.emptyListMessage('skills')

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loading: boolean = true
    errorMessage: string = ''
    isError: boolean = false
}
