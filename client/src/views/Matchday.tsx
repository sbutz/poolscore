import {
  memo, useCallback, useContext, useReducer,
} from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Stack } from '@mui/material';

import {
  initialState, reducer, Match, Matchday, leagues,
} from '../store/MatchdayState';
import MatchForm from '../components/MatchForm';
import FormField from '../components/FormField';
import { Context } from '../store/Store';
import ResponsiveStepper from '../components/ResponsiveStepper';

const matches = [
  ['14/1 endlos', false, 70],
  ['8-Ball', false, 5],
  ['9-Ball', false, 7],
  ['10-Ball', false, 6],
  ['9-Ball', true, 6],
  ['10-Ball', true, 5],
  ['14/1 endlos', false, 70],
  ['8-Ball', false, 5],
  ['9-Ball', false, 7],
  ['10-Ball', false, 6],
].map(([mode, team, firstTo], i) => ({
  id: i.toString(),
  players: {
    home: [],
    guest: [],
  },
  team,
  discipline: mode,
  firstTo,
  winner: undefined,
  points: { home: 0, guest: 0 },
  pocketPoints: { home: 0, guest: 0 },
})) as Match[];

interface MatchdayFormStartProps {
  date: string;
  onDateChange: (v: string) => void;
  league: string | undefined;
  onLeagueChange: (v: string) => void;
  teamHome: string;
  onTeamHomeChange: (v: string) => void;
  teamGuest: string;
  onTeamGuestChange: (v: string) => void;
}
const MatchdayFormStart = memo((props: MatchdayFormStartProps) => (
  <>
    <Stack key="date" direction="row" alignItems="center">
      <FormField
        label="Datum"
        type="date"
        value={props.date}
        onChange={props.onDateChange}
      />
      <FormField
        label="Startzeit"
        type="time"
        value={props.date}
        onChange={props.onDateChange}
      />
    </Stack>
    <Stack direction="row" alignItems="center">
      <FormField
        label="Liga"
        type="select"
        options={leagues}
        value={props.league || ''}
        onChange={props.onLeagueChange}
      />
    </Stack>
    <Stack direction="row" alignItems="center">
      <FormField
        label="Heimmannschaft"
        value={props.teamHome}
        onChange={props.onTeamHomeChange}
      />
      <FormField
        label="Gastmannschaft"
        value={props.teamGuest}
        onChange={props.onTeamGuestChange}
      />
    </Stack>
  </>
));

interface MatchdayFormEndProps {
  endTime: string;
  onEndTimeChange: (v: string) => void;
  pointsHome: number;
  pointsGuest: number;
}
const MatchdayFormEnd = memo((props: MatchdayFormEndProps) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    alignItems="center"
    justifyContent="space-between"
    spacing={3}
  >
    <FormField
      label="Spielende"
      type="time"
      value={props.endTime}
      onChange={props.onEndTimeChange}
    />
    <Stack direction="row">
      <FormField
        label="Heim"
        type="number"
        value={props.pointsHome.toString()}
      />
      <FormField
        label="Gast"
        type="number"
        value={props.pointsGuest.toString()}
      />
    </Stack>
  </Stack>
));

export default function MatchdayView() {
  const globalState = useContext(Context)[0];
  const { id } = useParams();

  const matchday = globalState.matchdays.find((m) => m.id === id)
        || { ...initialState, id } as Matchday;
  const [state, dispatch] = useReducer(reducer, matchday);

  const date = dayjs(state.startTime).format('YYYY-MM-DD HH:mm');
  const setDate = useCallback((v: string) => {
    dispatch({ type: 'set_start_time', value: v });
  }, []);
  const setEndTime = useCallback((v: string) => {
    dispatch({ type: 'set_end_time', value: v });
  }, []);
  const setLeague = useCallback((v: string) => {
    dispatch({ type: 'set_league', value: v });
  }, []);
  const setTeamHome = useCallback((v: string) => {
    dispatch({ type: 'set_team_home', value: v });
  }, []);
  const setTeamGuest = useCallback((v: string) => {
    dispatch({ type: 'set_team_guest', value: v });
  }, []);

  const steps = [
    {
      label: 'Allgemein',
      content: <MatchdayFormStart
        date={date}
        onDateChange={setDate}
        league={state.league}
        onLeagueChange={setLeague}
        teamHome={state.teams.home}
        onTeamHomeChange={setTeamHome}
        teamGuest={state.teams.guest}
        onTeamGuestChange={setTeamGuest}
      />,
    },
    {
      label: 'Durchgang #1',
      content: (
        <>
          <MatchForm match={matches[0]} />
          <MatchForm match={matches[1]} />
          <MatchForm match={matches[2]} />
          <MatchForm match={matches[3]} />
        </>
      ),
    },
    {
      label: 'Durchgang #2',
      content: (
        <>
          <MatchForm match={matches[4]} />
          <MatchForm match={matches[5]} />
        </>
      ),
    },
    {
      label: 'Durchgang #3',
      content: (
        <>
          <MatchForm match={matches[6]} />
          <MatchForm match={matches[7]} />
          <MatchForm match={matches[8]} />
          <MatchForm match={matches[9]} />
        </>
      ),
    },
    {
      label: 'Ergebnis',
      content: <MatchdayFormEnd
        endTime={dayjs(state.endTime).format('YYYY-MM-DD HH:MM')}
        onEndTimeChange={setEndTime}
        pointsHome={6}
        pointsGuest={4}
      />,
    },
  ];

  return (
    <ResponsiveStepper
      title="Spieltag"
      steps={steps}
    />
  );
}
