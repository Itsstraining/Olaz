
export interface User {
    id: string;
    email: string|null;
    displayName: string|null;
    photoURL: string|null;
    requests: Array<any>;
    friends: Array<any>;
    incall: boolean;
    rooms: Array<any>;
    statemanager: boolean;
}