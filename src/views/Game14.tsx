import { useReducer, useState } from 'react';
import { Button, Grid, Stack, Typography, useTheme, } from '@mui/material'
import { ChevronLeft, ChevronRight, PowerSettingsNew, Undo, } from '@mui/icons-material';

import { reducer, initialState, BALLS, PlayerState, isBreakFoulPossible, isFoulPossible } from '../store/GameState14';
import Layout from '../components/Layout';
import { useCallbackPrompt } from '../util/useCallbackPrompt';
import AlertDialog from '../components/AlertDialog';
import BorderBox from '../components/BorderBox';

function Game() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showReset, setShowReset] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(true);

    const toolbar = <>
        <Button
            color="inherit"
            startIcon={<Undo/>}
            onClick={() => { dispatch?.({type: 'ROLLBACK'}); }}
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
        <Grid container>
            <Grid item xs={5} textAlign="center">
                <Button
                    variant="contained"
                    color="success"
                    sx={{ fontSize: "3rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'SET_ACTIVE_PLAYER',
                            player: 'home',
                        });
                    }}
                >
                    Heim beginnt
                </Button>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5} textAlign="center">
                <Button
                    variant="contained"
                    color="success"
                    sx={{ fontSize: "3rem" }}
                    onClick={() => {
                        dispatch?.({
                            type: 'SET_ACTIVE_PLAYER',
                            player: 'guest',
                        });
                    }}
                >
                    Gast beginnt
                </Button>
            </Grid>
        </Grid>
    );

    const buttons = <>
        <Grid container justifyContent="center">
            <Grid item xs={5}>
                <Stack direction="row" justifyContent="center" gap={2}>
                    <BreakFoulButton
                        onClick={() => {
                            dispatch?.({ type: 'BREAK_FOUL' });
                        }}
                        disabled={state.activePlayer !== 'home' || !isBreakFoulPossible(state)}
                    />
                    <FoulButton
                        onClick={() => {
                            dispatch?.({ type: 'FOUL' });
                        }}
                        disabled={state.activePlayer !== 'home' || !isFoulPossible(state)}
                    />
                    <PlayerStatistics state={state.home} />
                    <EndRunButton
                        disabled={state.activePlayer !== 'home'}
                        onClick={() => {
                            dispatch?.({
                                type: 'SET_ACTIVE_PLAYER',
                                player: 'guest',
                            });
                        }}
                    />
                </Stack>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={5}>
                <Stack direction="row" justifyContent="center" gap={2}>
                    <EndRunButton
                        disabled={state.activePlayer !== 'guest'}
                        onClick={() => {
                            dispatch?.({
                                type: 'SET_ACTIVE_PLAYER',
                                player: 'home',
                            });
                        }}
                    />
                    <PlayerStatistics state={state.guest} />
                    <FoulButton
                        onClick={() => {
                            dispatch?.({ type: 'FOUL' });
                        }}
                        disabled={state.activePlayer !== 'guest' || !isFoulPossible(state)}
                    />
                    <BreakFoulButton
                        onClick={() => {
                            dispatch?.({ type: 'BREAK_FOUL' });
                        }}
                        disabled={state.activePlayer !== 'guest' || !isBreakFoulPossible(state)}
                    />
                </Stack>
            </Grid>
        </Grid>
        <Grid container justifyContent="center">
            <BorderBox label="Anzahl verbleibender Kugeln">
                {BALLS.map(i =>  {
                    const enabled = i <= state.remainingBalls;
                    const name = i === 1 ? '14+' : `${i}B`;
                    return <>
                        <img
                            key={i}
                            src={`${process.env.PUBLIC_URL}/${name}.svg`}
                            alt={name}
                            style={{
                                marginRight: 6,
                                marginLeft: 6,
                                width: "5rem",
                                filter: enabled ?  "none" : "grayscale(100%)",
                                opacity: enabled ? "100%" : "10%",
                            }}
                            onClick={() => {
                                if (enabled)
                                    dispatch?.({
                                        type: 'SET_REMAINING_BALLS',
                                        balls: i,
                                    });
                            }}
                        />
                    </>;
                })}
            </BorderBox>
        </Grid>
    </>;

    return (
        <Layout title="14/1 endlos" fullwidth toolbar={toolbar}>
            <Stack height="100%" justifyContent="space-around">
                <Players activePlayer={state.activePlayer} />
                <Score
                    home={state.home.score}
                    guest={state.guest.score}
                />
                {state.activePlayer === undefined ? startingPlayerSelect : buttons}
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
                    dispatch?.({type: 'RESET'});
                    if (showPrompt)
                        (confirmNavigation as (() => void))();
                    else
                        setShowReset(false);
                }}
            />
        </Layout>
    );
}

interface PlayersProps {
    activePlayer: 'home' | 'guest' | undefined;
}
function Players(props: PlayersProps) {
    const theme = useTheme();

    return (
        <Grid container>
            <Grid item xs={5}>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    <ChevronRight
                        sx={{
                            marginLeft: `-${theme.typography.h1.fontSize}`,
                            opacity: props.activePlayer === 'home' ? 1 : 0.1,
                            color: props.activePlayer === 'home' ? 'error.main' : null,
                            fontSize: theme.typography.h1.fontSize,
                        }}/>
                    <Typography variant="h1">Heim</Typography>
                </Stack>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={5} textAlign="center">
                <Stack direction="row" alignItems="center" justifyContent="center">
                    <Typography variant="h1">Gast</Typography>
                    <ChevronLeft
                        sx={{
                            marginRight: `-${theme.typography.h1.fontSize}`,
                            opacity: props.activePlayer === 'guest' ? 1 : 0.1,
                            color: props.activePlayer === 'guest' ? 'error.main' : null,
                            fontSize: theme.typography.h1.fontSize,
                        }}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

const scoreSx = {
    fontSize: "40vh",
    fontWeight: 400,
    lineHeight: 0.75,
    userSelect: "none",
};
interface ScoreProps {
    home: number;
    guest: number;
}
function Score(props: ScoreProps) {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={5} textAlign="center">
                <Typography sx={scoreSx}>
                    {props.home}
                </Typography>
            </Grid>
            <Grid item xs={2} textAlign="center">
                <Typography sx={scoreSx}>
                    :
                </Typography>
            </Grid>
            <Grid item xs={5} textAlign="center">
                <Typography sx={scoreSx}>
                    {props.guest}
                </Typography>
            </Grid>
        </Grid>
    );
}

interface EndRunButtonProps {
    disabled: boolean;
    onClick: () => void;
}
function EndRunButton(props: EndRunButtonProps) {
    const theme = useTheme();

    return (
        <Button
            color="success"
            disabled={props.disabled}
            sx={{ fontSize: theme.typography.h6.fontSize }}
            variant="contained"
            onClick={props.onClick}
        >
            Aufnahme<br/>beenden
        </Button>
    );
}

interface FoulButtonProps {
    disabled: boolean;
    onClick: () => void;
}
function FoulButton(props: FoulButtonProps) {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            color="error"
            sx={{ fontSize: theme.typography.h6.fontSize }}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            Foul
        </Button>
    )
}
function BreakFoulButton(props: FoulButtonProps) {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            color="error"
            sx={{ fontSize: theme.typography.h6.fontSize }}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            Break<br/>Foul
        </Button>
    )
}

interface PlayerStatisticsProps {
    state: PlayerState;
}
function PlayerStatistics(props: PlayerStatisticsProps) {
    const theme = useTheme();
    const color = props.state.fouls === 2 ?
        theme.palette.error.main : props.state.fouls === 1 ? theme.palette.warning.main : undefined;
    return (
        <BorderBox label="Statistik">
            <Stack direction="row" justifyContent="center" gap={2}>
                <Stack direction="column" justifyContent="center">
                    <table>
                        <tbody>
                            <tr>
                                <td><Typography variant='h6'>AN:</Typography></td>
                                <td><Typography variant='h6'>{props.state.runs.length}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='h6'>HS:</Typography></td>
                                <td><Typography variant='h6'>{props.state.highestScore}</Typography></td>
                            </tr>
                        </tbody>
                    </table>
                </Stack>
                <Stack direction="column" justifyContent="center">
                    <table>
                        <tbody>
                            <tr>
                                <td><Typography variant='h6'>GD:</Typography></td>
                                <td><Typography variant='h6'>{props.state.averageScore.toFixed(2)}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='h6' sx={{color}}>Fouls:</Typography></td>
                                <td><Typography variant='h6' sx={{color}}>{props.state.fouls}</Typography></td>
                            </tr>
                        </tbody>
                    </table>
                </Stack>
            </Stack>
        </BorderBox>
    );
}

export default Game;