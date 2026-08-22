import { observer } from './observer';

export const startSteamObserver = async () => {
    while (true) {
        try {
            await observer();
        } catch (error) {
            console.error('STEAM OBSERVER ERROR >>>', error);
        }

        await new Promise(resolve => setTimeout(resolve, Number(process.env.OBSERVER_TIME) * 1000 * 60));
    }
};