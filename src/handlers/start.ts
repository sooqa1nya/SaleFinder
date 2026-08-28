import { Composer } from 'gramio';


export const start = new Composer({ name: 'start' })
    .command('start', async context => {
        if (!context.user) {
            await context.send(`👋 Hi, you'll now receive notifications about free games on Steam`);
            return;
        }

        await context.send(`You're already signed up to receive messages, Wait.. 🥺`);
    });