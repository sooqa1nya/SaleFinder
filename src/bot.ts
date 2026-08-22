import { Bot } from 'gramio';
import { auth } from './handlers/auth';

export const bot = new Bot(process.env.BOT_TOKEN!)
    .extend(auth)
    .onStart(
        ({ plugins }) => {
            console.log(`🤖 Бот запущен`);
            console.log(`Список плагинов: ${plugins.join(", ")}`);
        }
    );