export interface IUserTechnologie {
    id?: number;
    id_technologie: number;
    percentage: number;
    technologie?: ITechnologie;
}

export interface ITechnologie {
    id: number;
    name: string;
    type: string;
}