import { Game } from './Game';
import { Mode } from './GameModes';
import { dummyGuestTeam, dummyHomeTeam, Team } from './Team';

// TODO: add more leagues
export enum League {
  OBERLIGA = 'Oberliga',
  LANDESLIGA = 'Landesliga',
}

export interface Matchday {
  id: string;
  date: Date;
  league: League;
  teams: {
    home: Team;
    guest: Team;
  };
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
      Game.create(Mode.Straight, raceTo[league][Mode.Straight]),
      Game.create(Mode.Ball8, raceTo[league][Mode.Ball8]),
      Game.create(Mode.Ball9, raceTo[league][Mode.Ball9]),
      Game.create(Mode.Ball10, raceTo[league][Mode.Ball10]),
      // second round
      Game.create(Mode.Ball9, raceTo[league][Mode.Ball9] - 1),
      Game.create(Mode.Ball10, raceTo[league][Mode.Ball10] - 1),
      // third round
      Game.create(Mode.Straight, raceTo[league][Mode.Straight]),
      Game.create(Mode.Ball8, raceTo[league][Mode.Ball8]),
      Game.create(Mode.Ball9, raceTo[league][Mode.Ball9]),
      Game.create(Mode.Ball10, raceTo[league][Mode.Ball10]),
    ];

    return {
      id: '',
      date: today,
      league,
      teams: {
        home: dummyHomeTeam,
        guest: dummyGuestTeam,
      },
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
