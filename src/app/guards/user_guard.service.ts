import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../auth/services/token.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuardService implements CanActivate {

    constructor(private readonly tokenService: TokenService, private readonly router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.tokenService.getToken()) {
            this.router.navigate(['/' + route.params['username']])
            return false;
        }
        if (this.tokenService.getUsername() !== route.params['username']) {
            this.router.navigate(['/' + route.params['username']])
            return false;
        }
        return true;
    }
}
