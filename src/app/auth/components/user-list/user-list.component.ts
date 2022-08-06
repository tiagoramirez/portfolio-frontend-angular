import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IUser } from '../../models/user.interface';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

    constructor(private authService: AuthService, private tokenService: TokenService) { }

    ngOnInit(): void {

        this.tokenService.getToken() ? this.isLogged = true : this.isLogged = false;

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

    onLogout() {
        this.tokenService.logOut();
        window.location.reload();
    }

    users: IUser[] = [];

    isLogged: boolean;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    error: boolean = false;
    loading: boolean = true;
}
