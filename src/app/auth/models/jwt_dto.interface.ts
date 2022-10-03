export interface IJwtDTO {
    userId: number
    token: string
    type: string
    username: string
    authorities: Authority[]
}

interface Authority {
    authority: string;
}