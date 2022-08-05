import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUser } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        let sub = this.authService.getAllUsers().subscribe({
            next: (data) => {
                this.users = data;
            },
            error: (e) => {
                this.loading = false;
                this.error = true;
                console.log(e);
            },
            complete: () => {
                this.loading = false;
                this.error = false;
                this.subsContainer.add(sub);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    users: IUser[] = [];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    error: boolean = false;
    loading: boolean = true;
}
