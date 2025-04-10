import { Game } from './Game';

interface ClubNames {
  home: string;
  guest: string;
}
const initialClubNames: ClubNames = {
  home: 'Heim',
  guest: 'Gast',
};

export interface Matchday {
  id: string;
  date: Date;
  names: ClubNames;
  games: Game[];
}

export namespace Matchday {
  export function create(): Matchday {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    return {
      id: '',
      date: today,
      names: initialClubNames,
      games: [],
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
