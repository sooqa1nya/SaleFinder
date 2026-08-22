import { InlineKeyboard } from 'gramio';

export const gameLinkKeyboard = (url: string) => {
    return new InlineKeyboard().url(
        "🔗 Open",
        url
    );
};