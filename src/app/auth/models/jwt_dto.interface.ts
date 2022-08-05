export interface IJwtDTO {
    userId: number;
    token: string;
    type: string;
    username: string;
    authorities: string[];
}