import { useReducer, useState } from 'react';
import { Button, Grid, Stack, Typography, } from '@mui/material'
import { PowerSettingsNew, Undo, } from '@mui/icons-material';

import { reducer, initialState } from '../store/GameState14';
import Layout from '../components/Layout';
import { useCallbackPrompt } from '../util/useCallbackPrompt';
import AlertDialog from '../components/AlertDialog';

function range(start : number, end : number) {
    const a = []
    for (; start < end; start++)
        a.push(start);
    return a;
}

const scoreSx = {
    fontSize: "40vh",
    fontWeight: 400,
    lineHeight: 0.6,
    userSelect: "none",
};

const activeSx = {
    color: 'warning.main',
}

function Game() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showReset, setShowReset] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] =
      useCallbackPrompt(true);

    const toolbar = <>
        <Button
            color="inherit"
            startIcon={<Undo/>}
            onClick={() => { dispatch?.({type: 'rollback'}); }}
        >
            Rückgängig
        </Button>
        <Button
            color="inherit"
            startIcon={<PowerSettingsNew/>}
            onClick={() => { setShowReset(true); }}
        >
            Neues Spiel
        </Button>
    </>;

    const startingPlayerSelect = (
        <Grid container justifyContent="center">
            <Grid item xs={5} textAlign="center">
                <Button
                    variant="contained"
                    sx={{ fontSize: "3rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'starting_player',
                            player: 'home',
                        });
                    }}
                >
                    Heim beginnt
                </Button>
            </Grid>
            <Grid item xs={2} textAlign="center">
            </Grid>
            <Grid item xs={5} textAlign="center">
                <Button
                    variant="contained"
                    sx={{ fontSize: "3rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'starting_player',
                            player: 'guest',
                        });
                    }}
                >
                    Gast beginnt
                </Button>
            </Grid>
        </Grid>
    );

    const score = (
        <Grid container justifyContent="center">
            <Grid item xs={5} textAlign="center">
                <Typography
                    variant="h1"
                    sx={state.playing === 'home' ?
                        {...scoreSx, ...activeSx} : scoreSx}
                >
                    {state.score_home}
                </Typography>
            </Grid>
            <Grid item xs={2} textAlign="center">
                <Typography variant="h1" sx={scoreSx}>:</Typography>
            </Grid>
            <Grid item xs={5} textAlign="center">
                <Typography
                    variant="h1"
                    sx={state.playing === 'guest' ?
                        {...scoreSx, ...activeSx} : scoreSx}
                >
                    {state.score_guest}
                </Typography>
            </Grid>
        </Grid>
    );
    const buttons = <>
        <Grid container justifyContent="center">
            <Grid item xs={5} textAlign="center">
                <Stack direction="row" spacing={2} justifyContent="center" pb={2}>
                    <Typography variant="h5">
                        Aufnahme: {state.runs_home.length}
                    </Typography>
                    <Typography variant="h5" sx={{
                        color: state.fouls_home === 1 ?
                            'warning.main' : (state.fouls_home > 1 ? 'error.main' : 'inherit')
                    }}>
                        Fouls: {state.fouls_home}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    sx={{ fontSize: "2rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'foul',
                            player: 'home',
                        });
                    }}
                    disabled={state.runs_home.at(-1)?.foul}
                >
                    Foul
                </Button>
            </Grid>
            <Grid item xs={2} textAlign="center">
            </Grid>
            <Grid item xs={5} textAlign="center">
                <Stack direction="row" spacing={2} justifyContent="center" pb={2}>
                    <Typography variant="h5">
                        Aufnahme: {state.runs_guest.length}
                    </Typography>
                    <Typography variant="h5" sx={{
                        color: state.fouls_guest === 1 ?
                            'warning.main' : (state.fouls_guest > 1 ? 'error.main' : 'inherit')
                    }}>
                        Fouls: {state.fouls_guest}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    sx={{ fontSize: "2rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'foul',
                            player: 'guest',
                        });
                    }}
                    disabled={state.runs_guest.at(-1)?.foul}
                >
                    Foul
                </Button>
            </Grid>
        </Grid>
        <Grid container justifyContent="center">
            <Grid item textAlign="center" width="100%">
                <Typography variant="h3" sx={{ mb: 4 }}>
                    Restliche Kugeln:
                </Typography>
                <img
                    src={`${process.env.PUBLIC_URL}/14+.svg`}
                    alt={"+14"}
                    style={{
                        width: "6%",
                    }}
                    onClick={() => {
                        dispatch?.({
                            type: 'remaining_balls',
                            remaining_balls: 1,
                        });
                    }}
                />
                {range(2, 16).map(i =>  {
                    const enabled = i <= state.remaining_balls;
                    return (
                        <img
                            key={i}
                            src={`${process.env.PUBLIC_URL}/${i}B.svg`}
                            alt={i.toString()}
                            style={{
                                width: "6%",
                                filter: enabled ?  "none" : "grayscale(100%)",
                                opacity: enabled ? "100%" : "10%",
                            }}
                            onClick={() => {
                                if (enabled)
                                    dispatch?.({
                                        type: 'remaining_balls',
                                        remaining_balls: i,
                                    });
                            }}
                        />
                    );
                })}
            </Grid>
        </Grid>
    </>;

    return (
    <Layout title="14/1 endlos" fullwidth toolbar={toolbar}>
        <Stack height="100%" alignItems="center" justifyContent="space-around">
            <Grid container justifyContent="space-evenly" mt="1em">
                <Grid item xs={5} textAlign="center">
                    <Typography
                        variant="h1"
                        sx={state.playing === 'home' ? activeSx : null}
                    >
                        Heim
                    </Typography>
                </Grid>
                <Grid item xs={2} textAlign="center">
                    <Typography variant="h1">vs</Typography>
                </Grid>
                <Grid item xs={5} textAlign="center">
                    <Typography
                        variant="h1"
                        sx={state.playing === 'guest' ? activeSx : null}
                    >
                        Gast
                    </Typography>
                </Grid>
            </Grid>
            {state.playing === undefined ?
                startingPlayerSelect : <>{score}{buttons}</>}
            {/*
            - foul anzeige
            - aufnhame anzeige
            */}
        </Stack>
        <AlertDialog
            open={showPrompt as boolean || showReset}
            title={showPrompt ? "Zurück zur Startseite?" : "Neues Spiel starten"}
            text={"Der aktuelle Spielstand geht dabei verloren."}
            cancelText={"Abbrechen"}
            onCancel={()=> {
                if (showPrompt)
                    (cancelNavigation as (() => void))();
                else
                    setShowReset(false);
            }}
            acceptText={"Ok"}
            onAccept={() => {
                dispatch?.({type: 'reset'});
                if (showPrompt)
                    (confirmNavigation as (() => void))();
                else
                    setShowReset(false);
            }}
        />
    </Layout>
    );
}

export default Game;