import { Bot } from 'gramio';
import { auth } from './handlers/auth';
import { user } from './handlers/user';
import { start } from './handlers/start';


export const bot = new Bot(process.env.BOT_TOKEN!)
    .extend(user)
    .extend(start)
    .extend(auth)
    .onStart(
        () => {
            console.log(`🤖 Бот запущен`);
        }
    );