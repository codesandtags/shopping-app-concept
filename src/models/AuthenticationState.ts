export interface AuthenticationState {
    isLoading: boolean;
    error: string;
    token: string;
    userId: string;
    isLogged: boolean;
}