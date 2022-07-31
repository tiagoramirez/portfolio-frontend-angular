export interface IPerson {
    id?: number;
    id_photo?:number;
    id_banner?:number;
    full_name: string;
    birthday?: Date;
    phone?: number;
    mail: string;
    description: string;
    location_state?: string;
    location_country?: string;
}