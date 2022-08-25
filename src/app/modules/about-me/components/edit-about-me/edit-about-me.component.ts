import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IAboutMe } from 'src/app/models/about_me.interface';
import { AboutMeService } from 'src/app/services/about-me.service';

@Component({
    selector: 'app-edit-about-me',
    templateUrl: './edit-about-me.component.html',
    styleUrls: ['./edit-about-me.component.css']
})
export class EditAboutMeComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private aboutMeService: AboutMeService, private router: Router) { }

    ngOnInit(): void {
        this.username = this.route.snapshot.params['username'];
        this.profileId = this.route.snapshot.params['profileId'];
        let sub = this.aboutMeService.getByProfileId(this.profileId).subscribe({
            next: (data) => {
                this.about_me = data;
                this.about_me.profileId = this.profileId;
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


    save() {
        this.loadingNewData = true;
        let sub = this.aboutMeService.edit(this.about_me).subscribe({
            error: (e) => {
                this.loadingNewData = false;
                console.error(e);
            },
            complete: () => {
                this.loadingNewData = false;
                this.subsContainer.add(sub);
                this.router.navigate(['/' + this.username]);
            }
        });
    }

    username: string;
    about_me: IAboutMe;
    profileId: number;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    loadingNewData: boolean = false;
}
