import { Game } from './Game';

interface ClubNames {
  home: string;
  guest: string;
}

export interface Matchday {
  id: string;
  names: ClubNames;
  games: Game[];
}

export namespace Matchday {
  export function getScore(matchday: Matchday, team: 'home' | 'guest'): number {
    return matchday.games.reduce((acc, game) => {
      if (Game.isFinished(game) && Game.getWinner(game) === team) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }
}
