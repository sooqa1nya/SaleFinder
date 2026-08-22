import { Composer } from 'gramio';
import { getUser, insertUser, updateLastActiveUser } from '../database/users';

export const auth = new Composer({ name: 'auth' })
    .use(async context => {
        if (!context.is('message')) {
            return;
        }

        const user = getUser.get(context.from.id);

        if (!user) {
            const date = new Date().toISOString();

            insertUser.run({
                id: context.from.id,
                username: context.from.username || null,
                first_name: context.from.firstName,
                register: date,
                last_activity: date,
                payload: ''
            });
        } else {
            updateLastActiveUser.run(context.from.id);
        }

        await context.send('Success');
    });