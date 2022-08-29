export interface IMatchComplete extends IMatch {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface IMatch {
  id: number | string,
  homeTeam: number | string,
  homeTeamGoals: number | string,
  awayTeam: number | string,
  awayTeamGoals: number | string,
  inProgress: boolean | number | string,
}

export interface IMatchInfo {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
