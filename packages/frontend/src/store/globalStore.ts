import { create } from "zustand"
import { Bot, Log, Worker } from "../utils/types";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface BotStore {
    bots: Array<Bot>;
    setBots: (bots: Array<Bot>) => void;
    workers: Array<Worker>;
    setWorkers: (workers: Array<Worker>) => void;
}

interface LogStore {
    botLogs: Array<Log>;
    setBotLogs: (botLogs: Array<Log>) => void;
    botLogsLimit: number;
    setBotLogsLimit: (limit: number) => void;
    botLogsOffset: number;
    setBotLogsOffset: (offset: number) => void;
    workerLogs: Array<Log>;
    setWorkerLogs: (workerLogs: Array<Log>) => void;
    workerLogsLimit: number;
    setWorkerLogsLimit: (limit: number) => void;
    workerLogsOffset: number;
    setWorkerLogsOffset: (offset: number) => void;
}

export const useBotStore = create<BotStore, [["zustand/persist", unknown]]>(
    persist(
        (set) => ({
            bots: [],
            setBots: (bots) => set({ bots }),
            workers: [],
            setWorkers: (workers) => set({ workers }),
        }),
        {
            name: 'bots',
            storage: createJSONStorage(() => localStorage),
        },
    )
);

export const useLogStore = create<LogStore, [["zustand/persist", unknown]]>(
    persist(
        (set) => ({
            botLogs: [],
            setBotLogs: (botLogs) => set({ botLogs }),
            botLogsLimit: 0,
            setBotLogsLimit: (limit) => set({ botLogsLimit: limit }),
            botLogsOffset: 0,
            setBotLogsOffset: (offset) => set({ botLogsOffset: offset }),
            workerLogs: [],
            setWorkerLogs: (workerLogs) => set({ workerLogs }),
            workerLogsLimit: 0,
            setWorkerLogsLimit: (limit) => set({ workerLogsLimit: limit }),
            workerLogsOffset: 0,
            setWorkerLogsOffset: (offset) => set({ workerLogsOffset: offset }),
        }),
        {
            name: 'logs',
            storage: createJSONStorage(() => localStorage),
        },
    )
)