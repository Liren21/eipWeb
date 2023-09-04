import {User} from "./User";

export type AuthContextType = {
    user?: User;
    signIn: (email: string, password: string) => Promise<{isOk: boolean, data?: User, message?: string}>;
    signOut: () => void;
    loading: boolean;
}
