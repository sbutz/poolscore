export interface Match {
    id: string;
    players: {
        home: string[];
        guest: string[];
    };
    team: boolean;
    discipline: '8-Ball' | '9-Ball' | '10-Ball' | '14/1 endlos';
    firstTo: number;
    winner: 'home' | 'guest' | undefined;
    points: {
        home: number;
        guest: number;
    };
    pocketPoints: {
        home: number;
        guest: number;
    };
    runs?: {
        home: number;
        guest: number;
    };
    highest_run?: {
        home: number;
        guest: number;
    };
}

export interface Matchday {
    id: string;
    startTime: Date;
    endTime?: Date;
    home: string;
    guest: string;
    winner: 'home' | 'guest' | undefined;
    points: {
        home: number;
        guest: number;
    }
    pocketPoints: {
        home: number;
        guest: number;
    }
    matches: Match[];
}

//TODO: interface per action type
interface Action {
    //TODO: fixed strings
    type: string;
}

export function reducer(state: Matchday, action: Action) {
    switch (action.type) {
        default:
            return state;
    }
}