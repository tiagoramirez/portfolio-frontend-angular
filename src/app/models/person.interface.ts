import { ILocation } from "./location.interface";
import { IMySocialMedia } from "./my_social_media.interface";

export interface IPerson {
    id?: number;
    full_name: string;
    birthday: Date;
    phone: number;
    mail: string;
    about_me: string;
    photo: string;
    my_social_media: IMySocialMedia[];
    location: ILocation;
}