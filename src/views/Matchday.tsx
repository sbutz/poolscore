import { useContext, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Stack, TextField, Typography, useTheme } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

import { initialState, reducer, Match, Matchday } from '../store/MatchdayState';
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
].map(([mode, team, firstTo], i) => {
    return {
        id: i.toString(),
        players: {
            home: [],
            guest: [],
        },
        team: team,
        discipline: mode,
        firstTo: firstTo,
        winner: undefined,
        points: { home: 0, guest: 0 },
        pocketPoints: { home: 0, guest: 0 },
    };
}) as Match[];

export default function MatchdayView() {
    const globalState = useContext(Context)[0];
    const navigate = useNavigate();
    const {id} = useParams();

    const matchday = globalState.matchdays.find(m => m.id === id)
        || {...initialState, id} as Matchday;
    const [state, dispatch] = useReducer(reducer, matchday);

    const date = dayjs(state.startTime).format("YYYY-MM-DD");
    const setDate = (v: string) => {
        dispatch({type: 'set_start_time', value: v});
    };

    const steps=[
        {
            label: 'Allgemein',
            content: <>
                <Stack key={'date'} direction="row" alignItems="center">
                    <FormField
                        label="Datum"
                        type="date"
                        value={date}
                        onChange={setDate}
                    />
                </Stack>
                <Stack direction="row" alignItems="center">
                    <FormField
                        label="Liga"
                        type="select"
                        options={['Oberliga', 'Verbandsliga', 'Landesliga', 'Bezirksliga', 'Kreisliga', 'Kreisklasse']}
                        value={state.league || ''}
                        onChange={(v) => {
                            dispatch({type: 'set_league', value: v});
                        }}
                    />
                </Stack>
                <Stack direction="row" alignItems="center">
                    <FormField
                        label="Heimmannschaft"
                        value={state.teams.home}
                        onChange={(v) => {
                            dispatch({type: 'set_team_home', value: v});
                        }}
                    />
                    <FormField
                        label="Gastmannschaft"
                        value={state.teams.guest}
                        onChange={(v) => {
                            dispatch({type: 'set_team_guest', value: v});
                        }}
                    />
                </Stack>
            </>,
        },
        {
            label: 'Durchgang #1',
            content: <>
                <MatchForm match={matches[0]} />
                <MatchForm match={matches[1]} />
                <MatchForm match={matches[2]} />
                <MatchForm match={matches[3]} />
            </>,
        },
        {
            label: 'Durchgang #2',
            content: <>
                <MatchForm match={matches[4]} />
                <MatchForm match={matches[5]} />
            </>,
        },
        {
            label: 'Durchgang #3',
            content: <>
                <MatchForm match={matches[6]} />
                <MatchForm match={matches[7]} />
                <MatchForm match={matches[8]} />
                <MatchForm match={matches[9]} />
            </>,
        },
        {
            label: 'Ergebnis',
            content: (
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <TimePicker
                        label="Spielende"
                        value={state.endTime}
                        onChange={(newValue) => {
                            if (dayjs(newValue).isValid())
                                console.log(dayjs(newValue).format("HH:mm"));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    <Typography variant='h6'>Endergebnis: 6 - 4</Typography>
                </Stack>
            ),
        },
    ];

    return <ResponsiveStepper
        steps={steps}
        onCancel={() => { navigate(-1); }}
        onSave={() => { navigate(-1); }}
    />;
}