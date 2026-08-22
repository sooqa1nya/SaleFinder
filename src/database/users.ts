import { db } from '.';


export interface User {
    id: number;
    username: string | null;
    first_name: string;
    register: string;
    last_activity: string;
    is_admin?: boolean;
    is_active?: boolean;
    payload: string;
}


export const insertUser = db.prepare<User>(`
    INSERT OR IGNORE INTO users (id, username, first_name, register, last_activity, payload)
    VALUES (@id, @username, @first_name, @register, @last_activity, @payload)
`);

export const getUsers = db.prepare<[], User>(`
    SELECT * FROM users
`);

export const getActiveUsers = db.prepare<[], User>(`
    SELECT * FROM users
    WHERE is_active = 1
`);

export const getUser = db.prepare<number, User>(`
    SELECT * FROM users
    WHERE id = ?
`);

export const updateActiveUser = db.prepare(`
    UPDATE users
    SET is_active = @is_active
    WHERE id = @id
`);

export const updateLastActiveUser = db.prepare(`
    UPDATE users
    SET last_activity = @last_activity
    WHERE id = @id
`);