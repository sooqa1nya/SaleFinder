import { User } from '../database/users';

declare module 'gramio' {
    interface Context<Bot> {
        user?: User;
    }
}