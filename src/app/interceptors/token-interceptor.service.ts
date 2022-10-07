import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { TokenService } from '../auth/services/token.service';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private readonly tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();

        if (token) {

            const reqClone = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            })
            return next.handle(reqClone);
        }

        return next.handle(req);

    }
}