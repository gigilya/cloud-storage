export interface LoginResponse {
    accessToken?: string;
    refreshToken: string;
}

export interface RegisterResponse {
    username: string;
    password: string;
    email: string;
}