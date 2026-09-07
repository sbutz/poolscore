import { Game } from './Game';
import { Mode } from './GameModes';
import { dummyGuestTeam, dummyHomeTeam, Team } from './Team';

// TODO: add more leagues
export enum League {
  REGIONALLIGA = 'Regionalliga',
  OBERLIGA = 'Oberliga',
  VERBANDSLIGA = 'Verbandsliga',
  LANDESLIGA = 'Landesliga',
  CHEF_CUP = 'Chef-Cup',
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

    const games : { [key in League]: Game[] } = {
      [League.REGIONALLIGA]: [
        // first round
        Game.create(Mode.Straight, 125),
        Game.create(Mode.Ball8, 8),
        Game.create(Mode.Ball9, 9),
        Game.create(Mode.Ball10, 8),
        // second round
        Game.create(Mode.Straight, 125),
        Game.create(Mode.Ball8, 8),
        Game.create(Mode.Ball9, 9),
        Game.create(Mode.Ball10, 8),
      ],
      [League.OBERLIGA]: [
        // first round
        Game.create(Mode.Straight, 90),
        Game.create(Mode.Ball8, 6),
        Game.create(Mode.Ball9, 8),
        Game.create(Mode.Ball10, 7),
        // second round
        Game.create(Mode.Ball9, 7),
        Game.create(Mode.Ball10, 6),
        // third round
        Game.create(Mode.Straight, 90),
        Game.create(Mode.Ball8, 6),
        Game.create(Mode.Ball9, 8),
        Game.create(Mode.Ball10, 7),
      ],
      [League.VERBANDSLIGA]: [
        // first round
        Game.create(Mode.Straight, 80),
        Game.create(Mode.Ball8, 6),
        Game.create(Mode.Ball9, 8),
        Game.create(Mode.Ball10, 7),
        // second round
        Game.create(Mode.Ball9, 7),
        Game.create(Mode.Ball10, 6),
        // third round
        Game.create(Mode.Straight, 80),
        Game.create(Mode.Ball8, 6),
        Game.create(Mode.Ball9, 8),
        Game.create(Mode.Ball10, 7),
      ],
      [League.LANDESLIGA]: [
        // first round
        Game.create(Mode.Straight, 70),
        Game.create(Mode.Ball8, 5),
        Game.create(Mode.Ball9, 7),
        Game.create(Mode.Ball10, 6),
        // second round
        Game.create(Mode.Ball9, 6),
        Game.create(Mode.Ball10, 5),
        // third round
        Game.create(Mode.Straight, 70),
        Game.create(Mode.Ball8, 5),
        Game.create(Mode.Ball9, 7),
        Game.create(Mode.Ball10, 6),
      ],
      [League.CHEF_CUP]: [
        // 1 - Team
        Game.create(Mode.Ball9, 3),
        // 2 - Individual
        Game.create(Mode.Ball9, 3),
        // 3 - Double
        Game.create(Mode.Ball9, 3),
        // 4 - Individual
        Game.create(Mode.Ball9, 3),
        // 5 - Individual
        Game.create(Mode.Ball9, 3),
        // 6 - Double
        Game.create(Mode.Ball9, 3),
        // 7 - Individual
        Game.create(Mode.Ball9, 3),
        // 8 - Individual
        Game.create(Mode.Ball9, 3),
        // 9 - Double
        Game.create(Mode.Ball9, 3),
        // 10 - Individual
        Game.create(Mode.Ball9, 3),
        // 11 - Individual (Captain's Pick)
        Game.create(Mode.Ball9, 3),
      ],
    };

    return {
      id: '',
      date: today,
      league,
      teams: {
        home: dummyHomeTeam,
        guest: dummyGuestTeam,
      },
      games: games[league],
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
