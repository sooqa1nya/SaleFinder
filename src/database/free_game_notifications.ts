import { db } from '.';


export interface FreeGameNotifications {
    app_id: string;
}


export const insertNotification = db.prepare<FreeGameNotifications>(`
    INSERT OR IGNORE INTO free_game_notifications (app_id)
    VALUES (@app_id)
`);

export const getFreeGameNotif = db.prepare<string, FreeGameNotifications>(`
    SELECT * FROM free_game_notifications
    WHERE app_id = ?
`);

export const getFreeGameNotifs = db.prepare<[], FreeGameNotifications>(`
    SELECT * FROM free_game_notifications
`);

export const deleteAllFreeGameNotifs = db.prepare(`
    DELETE FROM free_game_notifications
`);

export const deleteFreeGameNotifs = db.prepare(`
    DELETE FROM free_game_notifications
    WHERE app_id = ?
`);