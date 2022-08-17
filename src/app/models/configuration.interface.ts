export interface IConfiguration {
    id?: number; // Don't send to create new configuration
    profileId?: number; //Use: to add new configuration
    show_photo: boolean;
    show_banner: boolean;
    show_location: boolean;
    show_phone: boolean;
}