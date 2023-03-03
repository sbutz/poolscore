import dayjs from 'dayjs';

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
export const leagues = ['Oberliga', 'Verbandsliga', 'Landesliga', 'Bezirksliga', 'Kreisliga', 'Kreisklasse'];
export interface Matchday {
  id: string;
  league: 'Oberliga' | 'Verbandsliga' | 'Landesliga' | 'Bezirksliga' | 'Kreisliga' | 'Kreisklasse' | undefined;
  startTime: Date;
  endTime?: Date;
  teams: {
    home: string;
    guest: string;
  };
  winner: 'home' | 'guest' | undefined;
  points: {
    home: number;
    guest: number;
  };
  pocketPoints: {
    home: number;
    guest: number;
  };
  matches: Match[];
}

export const initialState = {
  id: '',
  league: undefined,
  startTime: new Date(),
  endTime: undefined,
  teams: {
    home: '',
    guest: '',
  },
  winner: undefined,
  points: {
    home: 0,
    guest: 0,
  },
  pocketPoints: {
    home: 0,
    guest: 0,
  },
  matches: [],
} as Matchday;

// TODO: interface per action type
interface Action {
  type: 'set_start_time' | 'set_league' | 'set_team_home' | 'set_team_guest';
  value: string;
}

export function reducer(state: Matchday, action: Action) : Matchday {
  switch (action.type) {
    case 'set_start_time':
      return { ...state, startTime: dayjs(action.value).toDate() };
    case 'set_league':
      return { ...state, league: action.value } as Matchday;
    case 'set_team_home':
      return { ...state, teams: { home: action.value, guest: state.teams.guest } };
    case 'set_team_guest':
      return { ...state, teams: { home: state.teams.home, guest: action.value } };
    default:
      return state;
  }
}
