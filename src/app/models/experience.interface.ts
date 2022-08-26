export interface IExperience {
    id?: number;
    userId?: number;
    position: string;
    type: string;
    company_name: string;
    location: string;
    isActual: boolean;
    start_date: Date;
    end_date?: Date;
    description:string;
}