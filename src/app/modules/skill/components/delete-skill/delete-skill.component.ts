import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AppSettings } from 'src/app/helpers/appSettings'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { SkillService } from 'src/app/services/skill.service'

@Component({
    selector: 'app-delete-skill',
    templateUrl: './delete-skill.component.html',
    styleUrls: ['./delete-skill.component.css']
})
export class DeleteSkillComponent implements OnInit, OnDestroy {
    constructor(private readonly route: ActivatedRoute, private readonly skillService: SkillService, private readonly router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username']
        this.userSkillsId = this.route.snapshot.params['userSkillsId']
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll()
    }

    delete(): void {
        this.isErrorLoadingNewData = false
        this.loadingNewData = true
        const sub = this.skillService.delete(this.userSkillsId).subscribe({
            error: (err) => {
                if (err.error.messageControlled !== undefined && err.error.messageControlled === true) {
                    this.errorMessageLoadingNewData = err.error.message
                } else {
                    this.errorMessageLoadingNewData = AppSettings.serverErrorMessage
                }
                this.isErrorLoadingNewData = true
                this.loadingNewData = false
            },
            complete: () => {
                this.loadingNewData = false
                this.subsContainer.add(sub)
                void this.router.navigate([this.username])
            }
        })
    }

    username: string
    userSkillsId: number

    subsContainer: SubscriptionContainer = new SubscriptionContainer()

    loadingNewData: boolean = false
    errorMessageLoadingNewData: string = ''
    isErrorLoadingNewData: boolean = false
}
