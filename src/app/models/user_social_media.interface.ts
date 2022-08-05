import { ISocialMedia } from './social_media.interface';

export interface IUserSocialMedia {
    id?: number;
    userId?: number;
    id_social_media: number;
    social_media?: ISocialMedia;
    link: string;
}