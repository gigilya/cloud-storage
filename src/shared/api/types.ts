export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RegisterResponse {
    username: string;
    password: string;
    email: string;
}
export interface FileItem {
    id: number;
    userId: number;
    fileName: string;
    fileSize: number;
    mimeType: string;
    bucketName: string;
    folderURL: string;
    updatedAt: string;
    createdAt: string;
    shared: boolean;
    public: boolean;
}
export interface UserProfile {
    id: number;
    username: string;
    email: string;
    bucketName: string;
    avatarUrl: string | null;
    storageLimit: number;
    userStorage: number;
    createdAt: string;
}