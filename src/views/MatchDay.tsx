import { Stack, Step, StepContent, StepLabel, Stepper, TextField, Typography } from '@mui/material';

import { Match } from '../store/Store';
import FormField from '../components/FormField';
import Layout from '../components/Layout';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

function MatchRow(m: Match) {
    return (
        <Stack direction='row' alignItems="start">
            <FormField
                label="Disziplin"
                value={`${m.discipline} ${m.team ? '(Doppel)' : ''}`}
                disabled
                sx={{maxWidth: '10rem'}}
            />
            {/*
            <FormField
                label="First To"
                type="numeric"
                value={m.firstTo.toString()}
                disabled
                sx={{width: '5.5rem'}}
            />
            */}
            {/*TODO: team */}
            <Stack direction="column">
                <Stack direction="row" alignItems="center">
                    <FormField
                        label="Spieler (Heim)"
                        value={m.players[0]}
                        sx={{ml: 2}}
                    />
                    <Typography>vs.</Typography>
                    <FormField
                        label="Spieler (Gast)"
                        value={m.guests[0]}
                    />
                </Stack>
                {m.team ?
                    <Stack direction="row" alignItems="center">
                        <FormField
                            label="Spieler (Heim)"
                            value={m.players[0]}
                            sx={{ml: 2}}
                        />
                        <Typography>vs.</Typography>
                        <FormField
                            label="Spieler (Gast)"
                            value={m.guests[0]}
                        />
                    </Stack> : null}
            </Stack>

            <Stack direction="row" alignItems="center">
            <FormField
                label="Heim"
                type="number"
                value={String(0)}
                sx={{ml: 2, width: '6rem'}}
            />
            <Typography>:</Typography>
            <FormField
                label="Gast"
                type="number"
                value={String(0)}
                sx={{width: '6rem'}}
            />
            </Stack>
        </Stack>
    );
}

export default function MatchDay() {
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
            players: [],
            guests: [],
            team: team,
            discipline: mode,
            firstTo: firstTo,
            winner: undefined,
            points: { home: 0, guest: 0 },
            pocketPoints: { home: 0, guest: 0 },
        };
    }) as Match[];

    return (
    <Layout nested title="Neuer Spieltag">
        <Stepper orientation="vertical">
            <Step active={true} completed={true}>
                <StepLabel>Allgemein</StepLabel>
                <StepContent>
                    <Stack direction="row" alignItems="center">
                        <FormField
                            label="Datum"
                            type="date"
                            value={"2022-08-01"}
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <FormField
                            label="Heimmannschaft"
                            value={"BC73 Pfeffenhausen 2"}
                        />
                        <Typography>vs.</Typography>
                        <FormField
                            label="Gastmannschaft"
                            value={"BC Ingolstadt 1"}
                        />
                    </Stack>
                </StepContent>
            </Step>
            <Step active={true}>
                <StepLabel>Durchgang #1</StepLabel>
                <StepContent>
                    <MatchRow {...matches[0]} />
                    <MatchRow {...matches[1]} />
                    <MatchRow {...matches[2]} />
                    <MatchRow {...matches[3]} />
                </StepContent>
            </Step>
            <Step active={true}>
                <StepLabel>Durchgang #2</StepLabel>
                <StepContent>
                    <MatchRow {...matches[4]} />
                    <MatchRow {...matches[5]} />
                </StepContent>
            </Step>
            <Step active={true}>
                <StepLabel>Durchgang #3</StepLabel>
                <StepContent>
                    <MatchRow {...matches[6]} />
                    <MatchRow {...matches[7]} />
                    <MatchRow {...matches[8]} />
                    <MatchRow {...matches[9]} />
                </StepContent>
            </Step>
            <Step active={true}>
                <StepLabel>Ergebnis</StepLabel>
                <StepContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <TimePicker
                            label="Spielende"
                            value={null}
                            onChange={(newValue) => {
                                if (dayjs(newValue).isValid())
                                    console.log(dayjs(newValue).format("HH:mm"));
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        <Typography variant='h6'>Endergebnis: 6 - 4</Typography>
                    </Stack>
                </StepContent>
            </Step>
        </Stepper>
    </Layout>
    )
}