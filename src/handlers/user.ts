import { Composer } from 'gramio';
import { getUser } from '../database/users';

export const user = new Composer({ name: 'user' })
    .derive(async context => {
        if (context.is('message')) {
            const user = getUser.get(context.from.id);
            return { user };
        }
        return {};
    })
    .as('scoped');