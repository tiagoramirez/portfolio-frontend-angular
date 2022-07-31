import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';
import { ISocialMedia } from 'src/app/models/social_media.interface';
import { SocialMediaService } from '../../services/social-media.service';

@Component({
    selector: 'app-handle-social-media',
    templateUrl: './handle-social-media.component.html',
    styleUrls: ['./handle-social-media.component.css']
})
export class HandleSocialMediaComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private socialMediaService: SocialMediaService, private router: Router) { }

    ngOnInit(): void {
        this.idSmToModify = this.route.snapshot.params['idSm'];
        this.idPersonToModify = this.route.snapshot.params['idPerson'];
        this.action = this.route.snapshot.params['action'];
        
        if (this.action !== 'crear') {
            let subMySocialMedia: Subscription = this.socialMediaService.getById(this.idSmToModify).subscribe({
                next: (sm) => {
                    this.my_social_media = sm;
                    this.loadingMySocialMedia = false;
                },
                error: (e) => {
                    console.error(e);
                    this.error = true;
                    this.loadingMySocialMedia = false;
                },
                complete: () => {
                    this.subsContainer.add(subMySocialMedia);
                }
            });
        }
        else {
            this.loadingMySocialMedia = false;
            this.my_social_media = {
                personId: this.idPersonToModify,
                id_social_media: null,
                social_media: null,
                link: "",
            }
        }
        if (this.action !== 'borrar') {
            let subSocialMedia: Subscription = this.socialMediaService.getAllAvailable().subscribe({
                next: (all_sm) => {
                    this.all_social_media = all_sm;
                    this.loadingSocialMedia = false;
                },
                error: (e) => {
                    console.error(e);
                    this.error = true;
                    this.loadingSocialMedia = false;
                },
                complete: () => {
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

    idSmToModify: number;
    idPersonToModify: number;
    action: string;
    my_social_media: IMySocialMedia;
    all_social_media: ISocialMedia[];
    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadingMySocialMedia: boolean = true;
    loadingSocialMedia: boolean = true;
    error: boolean = false;
    errorMessage: string;

    handleSubmit() {
        this.error = false;
        const errorNumber = this.socialMediaService.check(this.my_social_media);
        if (errorNumber != 0) {
            this.error = true;
            this.errorMessage = this.socialMediaService.getErrorMessage(errorNumber);
        }
        else {
            switch (this.action) {
                case 'crear':
                    let subAdd: Subscription = this.socialMediaService.addNew(this.my_social_media).subscribe({
                        next: (v) => {
                            console.log("Subido correctamente");
                        },
                        error: (e) => {
                            this.error = true;
                            this.errorMessage = "Error en la conexion. Intenta de nuevo mas tarde.";
                            console.error(e);
                        },
                        complete: () => {
                            this.subsContainer.add(subAdd);
                            this.router.navigate(['redes-sociales/editar/' + this.idPersonToModify]);
                        }
                    })
                    break;
                case 'editar':
                    let subEdit: Subscription = this.socialMediaService.edit(this.my_social_media).subscribe({
                        next: (v) => {
                            console.log("Editado correctamente");
                        },
                        error: (e) => {
                            this.error = true;
                            this.errorMessage = "Error en la conexion. Intenta de nuevo mas tarde.";
                            console.error(e);
                        },
                        complete: () => {
                            this.subsContainer.add(subEdit);
                            this.router.navigate(['redes-sociales/editar/' + this.idPersonToModify]);
                        }
                    })
                    break;
                case 'borrar':
                    let subDelete: Subscription = this.socialMediaService.delete(this.idSmToModify).subscribe({
                        next: () => {
                            console.log("Eliminado correctamente");
                        },
                        error: (e) => {
                            this.error = true;
                            this.errorMessage = "Error en la conexion. Intenta de nuevo mas tarde.";
                            console.error(e);
                        },
                        complete: () => {
                            this.subsContainer.add(subDelete);
                            this.router.navigate(['redes-sociales/editar/' + this.idPersonToModify]);
                        }
                    })
                    break;
            }
        }
    }
}
