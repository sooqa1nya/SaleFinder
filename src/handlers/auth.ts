import { Composer } from 'gramio';
import { getUser, insertUser, updateLastActiveUser } from '../database/users';

export const auth = new Composer({ name: 'auth' })
    .use(async context => {
        if (!context.is('message')) {
            return;
        }

        const user = getUser.get(context.from.id);

        const date = new Date().toISOString();

        if (!user) {
            insertUser.run({
                id: context.from.id,
                username: context.from.username || null,
                first_name: context.from.firstName,
                register: date,
                last_activity: date,
                payload: ''
            });
        } else {
            updateLastActiveUser.run({
                id: context.from.id,
                last_activity: date
            });
        }

        await context.send('Success');
    });