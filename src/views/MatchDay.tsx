import { useState } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Divider, MobileStepper, Stack, Step, StepContent, StepLabel, Stepper, TextField, Typography, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers';

import { Match } from '../store/Store';
import FormField from '../components/FormField';
import Layout from '../components/Layout';

function MatchRow(m: Match) {
    return (
    <Box>
        <Divider textAlign="left">
            <Typography variant="overline">
                {`${m.discipline} ${m.team ? '(Doppel)' : ''}`}
            </Typography>
        </Divider>
        <Stack direction={{ xs: 'column', md: 'row' }}>
            {['home', 'guest'].map(t => (
                <Stack key={t} direction="column" sx={{width: '100%'}}>
                    <FormField
                        label={`Spieler (${t === 'home' ? 'Heim' : 'Gast'})`}
                        value={m.players[t as keyof typeof m.players][0]}
                        sx={{width: '100%'}}
                    />
                    {m.team ?
                    <FormField
                        label={`Spieler (${t === 'home' ? 'Heim' : 'Gast'})`}
                        value={m.players[t as keyof typeof m.players][1]}
                        sx={{width: '100%'}}
                    /> : null
                    }
                    {m.discipline === "14/1 endlos" ?
                    <Stack direction="row">
                        <FormField
                            label="Bälle"
                            type="number"
                            value={String(55)}
                            sx={{width: '100%'}}
                        />
                        <FormField
                            label="Aufn."
                            type="number"
                            value={String(10)}
                            sx={{width: '100%'}}
                        />
                        <FormField
                            label="HS"
                            type="number"
                            value={String(11)}
                            sx={{width: '100%'}}
                        />
                    </Stack> : null}
                </Stack>
            ))}
            <Stack direction="column">
                <Stack direction="row" alignItems="center">
                    <FormField
                        label="Heim"
                        type="number"
                        value={String(0)}
                        sx={{width: '6rem'}}
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
        </Stack>
    </Box>
    );
}

export default function MatchDay() {
    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };

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

    const steps=[
        {
            label: 'Allgemein',
            /*TODO: add liga select -> set remaining template*/
            content: [
                <Stack key={'date'} direction="row" alignItems="center">
                    <FormField
                        label="Datum"
                        type="date"
                        value={"2022-08-01"}
                    />
                </Stack>,
                <Stack key={'names'} direction="row" alignItems="center">
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
            ],
        },
        {
            label: 'Durchgang #1',
            content: [
                <MatchRow key={0} {...matches[0]} />,
                <MatchRow key={1} {...matches[1]} />,
                <MatchRow key={2} {...matches[2]} />,
                <MatchRow key={3} {...matches[3]} />,
            ],
        },
        {
            label: 'Durchgang #2',
            content: [
                <MatchRow key={4} {...matches[4]} />,
                <MatchRow key={5} {...matches[5]} />,
            ],
        },
        {
            label: 'Durchgang #3',
            content: [
                <MatchRow key={6} {...matches[6]} />,
                <MatchRow key={7} {...matches[7]} />,
                <MatchRow key={8} {...matches[8]} />,
                <MatchRow key={9} {...matches[9]} />,
            ],
        },
        {
            label: 'Ergebnis',
            content: [
                <Stack
                    key={'result'}
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={3}
                >
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
            ],
        },
    ];

    return (
    <Box>
        {/* Mobile */}
        <Box
            sx={{
                [theme.breakpoints.up('md')]: {
                    display: 'none',
                },
            }}
        >
            <Layout nested title={steps[activeStep].label}>
                {steps[activeStep].content}
            </Layout>
            <MobileStepper
                steps={steps.length}
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === steps.length-1}
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </Box>
        {/* Desktop */}
        <Box
            sx={{
                [theme.breakpoints.down('md')]: {
                    display: 'none',
                },
            }}
        >
            <Layout nested title="Neuer Spieltag">
                <Stepper orientation="vertical">
                    {steps.map((s,i) => (
                        <Step key={i} active={true}>
                            <StepLabel>{s.label}</StepLabel>
                            <StepContent>{s.content}</StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Layout>
        </Box>
    </Box>
    )
}