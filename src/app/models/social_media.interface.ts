export interface IUserSocialMedia {
    id?: number; // Don't send to create new user social media
    userId?: number; //Use: to add new user social media
    id_social_media: number;
    social_media?: ISocialMedia; // Don't send to create new user social media
    link: string;
}

export interface ISocialMedia {
    id: number;
    name: string;
    icon_class: string;
}