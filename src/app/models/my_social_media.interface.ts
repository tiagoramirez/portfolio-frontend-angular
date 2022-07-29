import { ISocialMedia } from './social_media.interface';

export interface IMySocialMedia {
    id?: number;
    id_person?: number;
    id_social_media?: number;
    social_media: ISocialMedia;
    link: string;
}