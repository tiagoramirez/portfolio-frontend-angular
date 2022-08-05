export interface IJwtDTO {
    token: string;
    type: string;
    username: string;
    authorities: string[];
}