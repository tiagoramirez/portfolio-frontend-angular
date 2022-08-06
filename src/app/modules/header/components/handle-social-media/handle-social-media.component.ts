import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { ISocialMedia } from 'src/app/models/social_media.interface';
import { IUserSocialMedia } from 'src/app/models/user_social_media.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
    selector: 'app-handle-social-media',
    templateUrl: './handle-social-media.component.html',
    styleUrls: ['./handle-social-media.component.css']
})
export class HandleSocialMediaComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private socialMediaService: SocialMediaService, private router: Router, private tokenService: TokenService) { }

    ngOnInit(): void {

        this.username = this.route.snapshot.params['username'];
        this.action = this.route.snapshot.params['action'];
        this.idSmToModify = this.route.snapshot.params['idSm'];

        if (this.action !== 'crear') {
            let subMySocialMedia: Subscription = this.socialMediaService.getById(this.idSmToModify).subscribe({
                next: (data) => {
                    this.user_social_media = data;
                },
                error: (e) => {
                    this.loadingMySocialMedia = false;
                    this.serverError = true;
                    console.error(e);
                },
                complete: () => {
                    this.loadingMySocialMedia = false;
                    this.subsContainer.add(subMySocialMedia);
                }
            });
        }
        else {
            this.loadingMySocialMedia = false;
            this.user_social_media = {
                id_social_media: null,
                social_media: null,
                link: "",
            }
        }
        if (this.action !== 'borrar') {
            let subSocialMedia: Subscription = this.socialMediaService.getAll().subscribe({
                next: (data) => {
                    this.all_social_media = data;
                },
                error: (e) => {
                    this.loadingSocialMedia = false;
                    this.serverError = true;
                    console.error(e);
                },
                complete: () => {
                    this.loadingSocialMedia = false;
                    this.subsContainer.add(subSocialMedia);
                }
            });
        }
        else {
            this.loadingSocialMedia = false;
        }
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    onSubmit() {
        this.loadingSubmit = true;
        this.submitError = false;
        const errorNumber = this.socialMediaService.check(this.user_social_media);
        if (errorNumber != 0) {
            this.loadingSubmit = false;
            this.submitError = true;
            this.errorMessage = this.socialMediaService.getErrorMessage(errorNumber);
        }
        else {
            switch (this.action) {
                case 'crear':
                    this.user_social_media.userId = this.tokenService.getUserId();
                    let subAdd: Subscription = this.socialMediaService.addNew(this.user_social_media).subscribe({
                        next: () => {
                            console.log("Subido correctamente");
                        },
                        error: (e) => {
                            this.submitError = true;
                            this.loadingSubmit = false;
                            this.errorMessage = "Error en la conexion. Intenta de nuevo mas tarde.";
                            console.error(e);
                        },
                        complete: () => {
                            this.loadingSubmit = false;
                            this.subsContainer.add(subAdd);
                            this.router.navigate(['/' + this.username]);
                        }
                    })
                    break;
                case 'editar':
                    console.log(this.user_social_media);

                    let subEdit: Subscription = this.socialMediaService.edit(this.user_social_media).subscribe({
                        next: () => {
                            console.log("Editado correctamente");
                        },
                        error: (e) => {
                            this.loadingSubmit = false;
                            this.submitError = true;
                            this.errorMessage = "Error en la conexion. Intenta de nuevo mas tarde.";
                            console.error(e);
                        },
                        complete: () => {
                            this.loadingSubmit = false;
                            this.subsContainer.add(subEdit);
                            this.router.navigate(['/' + this.username]);
                        }
                    })
                    break;
                case 'borrar':
                    let subDelete: Subscription = this.socialMediaService.delete(this.idSmToModify).subscribe({
                        next: () => {
                            console.log("Eliminado correctamente");
                        },
                        error: (e) => {
                            this.loadingSubmit = false;
                            this.submitError = true;
                            this.errorMessage = "Error en la conexion. Intenta de nuevo mas tarde.";
                            console.error(e);
                        },
                        complete: () => {
                            this.loadingSubmit = false;
                            this.subsContainer.add(subDelete);
                            this.router.navigate(['/' + this.username]);
                        }
                    })
                    break;
            }
        }
    }

    username: string;
    action: string;
    idSmToModify: number;
    user_social_media: IUserSocialMedia;
    all_social_media: ISocialMedia[];

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingMySocialMedia: boolean = true;
    loadingSocialMedia: boolean = true;
    loadingSubmit: boolean = false;
    serverError: boolean = false;
    submitError: boolean = false;
    errorMessage: string;
}