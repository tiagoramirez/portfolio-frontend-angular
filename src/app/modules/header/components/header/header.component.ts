import { Component, Input, OnInit } from '@angular/core';
import { IMySocialMedia } from 'src/app/models/my_social_media.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

    @Input() socialMedia: IMySocialMedia[];
}
