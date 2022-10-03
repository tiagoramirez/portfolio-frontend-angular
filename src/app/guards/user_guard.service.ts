import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../auth/services/token.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuardService implements CanActivate {

    constructor(private readonly tokenService: TokenService, private readonly router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRole = route.data['expectedRole'];

        const roles = this.tokenService.getAuthorities();

        if (!this.tokenService.getToken() || roles.indexOf(expectedRole) === -1) {
            this.router.navigate(['/'])
            return false;
        }
        if (this.tokenService.getUsername() !== route.params['username']) {
            this.router.navigate(['/'])
            return false;
        }
        return true;
    }
}
