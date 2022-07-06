export interface User {
    displayName?: string,
    email: string,
    friends: Array<User>,
    id: string,
    incall: boolean,
    photoURL: string,
    requests: Array<string>,
    rooms: Array<string>
}