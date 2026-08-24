import { MediaUpload } from 'gramio';
import { bot } from '../bot';
import { deleteAllFreeGameNotifs, deleteFreeGameNotifs, getFreeGameNotif, getFreeGameNotifs, insertNotification } from '../database/free_game_notifications';
import { getActiveUsers, updateActiveUser } from '../database/users';
import { getFreeGames } from './getFreeGames';
import { gameLinkKeyboard } from '../buttons';


export const observer = async () => {
    const games = await getFreeGames();
    const gamesDb = getFreeGameNotifs.all();

    if (!games.length) {
        if (!gamesDb.length) {
            return;
        }

        deleteAllFreeGameNotifs.run();
        return;
    }

    for (const gameDb of gamesDb) {
        const expiredGame = games.find(x => x.appId == gameDb.app_id);
        if (!expiredGame) {
            deleteFreeGameNotifs.run(gameDb.app_id);
        }
    }

    for (const game of games) {
        if (!game.appId) {
            continue;
        }

        const gameDb = getFreeGameNotif.get(game.appId);
        if (gameDb) {
            continue;
        }

        insertNotification.run({
            app_id: game.appId
        });

        const users = getActiveUsers.all();
        for (const user of users) {
            const text = `
🎮 <b>${game.title}</b>
 │
 ├ Released: <code>${game.released}</code>
 └ Price: <code>${game.originalPrice}</code>

<blockquote>${game.reviewTooltip}</blockquote>
            `;

            try {
                await bot.api.sendPhoto({
                    chat_id: user.id,
                    photo: await MediaUpload.url(game.img),
                    caption: text,
                    parse_mode: 'HTML',
                    reply_markup: gameLinkKeyboard(game.href!)
                });
            } catch (e) {
                try {
                    await bot.api.sendMessage({
                        chat_id: user.id,
                        text: text,
                        parse_mode: 'HTML',
                        reply_markup: gameLinkKeyboard(game.href!)
                    });
                } catch {
                    updateActiveUser.run({
                        id: user.id,
                        is_active: 0
                    });
                }
            }
        }
    }
};
