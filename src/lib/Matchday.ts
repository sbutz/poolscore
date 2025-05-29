import { Game, initialGame } from './Game';
import { Mode } from './GameModes';

interface ClubNames {
  home: string;
  guest: string;
}
const initialClubNames: ClubNames = {
  home: 'Heim',
  guest: 'Gast',
};

// TODO: add more leagues
export enum League {
  OBERLIGA = 'Oberliga',
  LANDESLIGA = 'Landesliga',
}

export interface Matchday {
  id: string;
  date: Date;
  league: League;
  names: ClubNames;
  games: Game[];
}

export namespace Matchday {
  export function create(league: League): Matchday {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    const raceTo = {
      [League.OBERLIGA]: {
        [Mode.Ball8]: 6,
        [Mode.Ball9]: 8,
        [Mode.Ball10]: 7,
        [Mode.Straight]: 90,
      },
      [League.LANDESLIGA]: {
        [Mode.Ball8]: 5,
        [Mode.Ball9]: 7,
        [Mode.Ball10]: 6,
        [Mode.Straight]: 70,
      },
    };

    const games : Game[] = [
      // first round
      { ...initialGame, mode: Mode.Ball8, raceTo: raceTo[league][Mode.Ball8] },
      { ...initialGame, mode: Mode.Ball9, raceTo: raceTo[league][Mode.Ball9] },
      { ...initialGame, mode: Mode.Ball10, raceTo: raceTo[league][Mode.Ball10] },
      { ...initialGame, mode: Mode.Straight, raceTo: raceTo[league][Mode.Straight] },
      // second round
      { ...initialGame, mode: Mode.Ball9, raceTo: raceTo[league][Mode.Ball9] - 1 },
      { ...initialGame, mode: Mode.Ball10, raceTo: raceTo[league][Mode.Ball10] - 1 },
      // third round
      { ...initialGame, mode: Mode.Ball8, raceTo: raceTo[league][Mode.Ball8] },
      { ...initialGame, mode: Mode.Ball9, raceTo: raceTo[league][Mode.Ball9] },
      { ...initialGame, mode: Mode.Ball10, raceTo: raceTo[league][Mode.Ball10] },
      { ...initialGame, mode: Mode.Straight, raceTo: raceTo[league][Mode.Straight] },
    ];

    return {
      id: '',
      date: today,
      league,
      names: initialClubNames,
      games,
    };
  }

  export function getScore(matchday: Matchday, team: 'home' | 'guest'): number {
    return matchday.games.reduce((acc, game) => {
      if (Game.isFinished(game) && Game.getWinner(game) === team) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }
}
