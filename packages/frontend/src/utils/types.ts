export type Bot = {
    id: string;
    name: string;
    description: string;
    status: string;
    created: Date;
};

export type Worker = {
    id: string;
    name: string;
    description: string;
    bot: string;
    created: Date;
}

export type Log = {
    id: string
    created: Date
    message: string
    bot: string
    worker: string
}