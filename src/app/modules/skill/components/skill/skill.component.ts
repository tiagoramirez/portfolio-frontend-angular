import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer'
import { IUserSkills } from 'src/app/models/skill.interface'
import { SkillService } from 'src/app/services/skill.service'

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit, OnDestroy {
  constructor (private readonly route: ActivatedRoute, private readonly skillService: SkillService) { }

  ngOnInit (): void {
    this.username = this.route.snapshot.params['username']

    const sub: Subscription = this.skillService.getAllByUsername(this.username).subscribe({
      next: (data) => {
        this.skills = data
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        this.subsContainer.add(sub)
      }
    })
  }

  ngOnDestroy (): void {
    this.subsContainer.unsubscribeAll()
  }

  username: string
  skills: IUserSkills[] = []

  subsContainer: SubscriptionContainer = new SubscriptionContainer()
}
