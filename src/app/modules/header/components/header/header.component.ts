import { Component, Input, OnInit } from '@angular/core';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';
import { SocialMediaService } from '../../services/social-media.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private socialMediaService: SocialMediaService) { }

    ngOnInit(): void {
        this.socialMediaService.getAll().subscribe((res) => {
            this.socialMedia = res;

        });
    }

    socialMedia: IMySocialMedia[] = [];

    @Input() name: string;
}
