import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getBase64 } from 'src/app/helpers/getBase64';
import { SubscriptionContainer } from 'src/app/helpers/subscriptionContainer';
import { IPerson } from 'src/app/models/person.interface';
import { BannerService } from 'src/app/services/banner.service';
import { PersonService } from 'src/app/services/person.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
    selector: 'app-edit-photo',
    templateUrl: './edit-photo.component.html',
    styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private router: Router, private personService: PersonService, private photoService: PhotoService, private bannerService: BannerService) { }

    ngOnInit(): void {
        this.personId = this.route.snapshot.params['id'];
        this.type = this.route.snapshot.params['type'];
        let subPerson: Subscription = this.personService.getById(this.personId).subscribe({
            next: (p) => {
                this.person = p;
                if (p.id_photo !== null && p.id_photo !== undefined) {
                    if (this.type === 'foto') {
                        let subPhoto: Subscription = this.photoService.getById(p.id_photo).subscribe({
                            next: (ph) => {
                                this.photoString = 'data:image/jpeg;base64,' + ph.photo;
                                this.photoLoaded = true;
                                this.loading = false;
                            },
                            error: (e) => {
                                console.error(e);
                                this.loading = false;
                            },
                            complete: () => {
                                this.subsContainer.add(subPhoto);
                            }
                        });
                    }
                    if (this.type === 'fondo') {
                        let subBanner: Subscription = this.bannerService.getById(p.id_banner).subscribe({
                            next: (ph) => {
                                this.photoString = 'data:image/jpeg;base64,' + ph.banner;
                                this.photoLoaded = true;
                                this.loading = false;
                            },
                            error: (e) => {
                                console.error(e);
                                this.loading = false;
                            },
                            complete: () => {
                                this.subsContainer.add(subBanner);
                            }
                        });
                    }
                }
                this.loading = false;
            },
            error: (e) => {
                console.error(e);
                this.loading = false;
            },
            complete: () => {
                this.subsContainer.add(subPerson);
            }
        });
    }

    ngOnDestroy(): void {
        this.subsContainer.unsubscribeAll();
    }

    type: string;
    personId: number;
    person: IPerson;

    photoString: string;
    photoFile: File;

    loading: boolean = true;
    photoLoaded: boolean = false;

    subsContainer: SubscriptionContainer = new SubscriptionContainer();

    loadImg(event: any) {
        this.photoFile = <File>event.target.files[0];
        getBase64(this.photoFile).then((res: any) => this.photoString = res.base);
        this.photoLoaded = true;
    }

    saveImg() {
        if (this.photoFile !== undefined) {
            if (this.type === 'foto') {
                let subPhoto: Subscription = this.photoService.addNew(this.photoFile).subscribe({
                    next: (p) => {
                        console.log("Nueva foto cargada exitosamente");
                        this.person.id_photo = p.id;
                        let subPerson: Subscription = this.personService.edit(this.person).subscribe({
                            next: (person) => {
                                console.log("Imagen de la persona cargada exitosamente");
                                console.log(person);
                            },
                            error: (e) => {
                                console.error(e);
                            },
                            complete: () => {
                                this.subsContainer.add(subPerson);
                                this.router.navigate(['']);
                            }
                        })
                    },
                    error: (e) => {
                        console.error(e);
                    },
                    complete: () => {
                        this.subsContainer.add(subPhoto);
                    }
                });
            }
            if (this.type === 'fondo') {
                let subBanner: Subscription = this.bannerService.addNew(this.photoFile).subscribe({
                    next: (p) => {
                        console.log("Nueva foto cargada exitosamente");
                        this.person.id_banner = p.id;
                        let subPerson: Subscription = this.personService.edit(this.person).subscribe({
                            next: (person) => {
                                console.log("Imagen de la persona cargada exitosamente");
                                console.log(person);
                            },
                            error: (e) => {
                                console.error(e);
                            },
                            complete: () => {
                                this.subsContainer.add(subPerson);
                                this.router.navigate(['']);
                            }
                        })
                    },
                    error: (e) => {
                        console.error(e);
                    },
                    complete: () => {
                        this.subsContainer.add(subBanner);
                    }
                });
            }
        }
    }
}