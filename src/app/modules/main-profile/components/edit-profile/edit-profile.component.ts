import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IPerson } from 'src/app/models/person.interface';
import { PersonService } from '../../services/person.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private personService: PersonService) { }

    ngOnInit(): void {
        this.personId = this.route.snapshot.params['id'];
        let subPerson = this.personService.getById(this.personId).subscribe({
            next: (p) => {
                this.person = p;
                this.loading = false;
            },
            error: (e) => {
                this.error = true;
                this.loading = false;
                console.error(e);
            },
            complete: () => {
                this.subsContainer.add(subPerson);
            }
        })

    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    personId: number;
    person: IPerson

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loading: boolean = true;
    error: boolean = false;
}
