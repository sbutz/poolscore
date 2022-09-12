import { useReducer, useState } from 'react';
import { Button, Grid, Stack, Typography, } from '@mui/material'
import { Add, PowerSettingsNew, Remove, Undo, } from '@mui/icons-material';

import { reducer, initialState } from '../store/GameState';
import Layout from '../components/Layout';
import { useCallbackPrompt } from '../util/useCallbackPrompt';
import AlertDialog from '../components/AlertDialog';

const scoreSx = {
    fontSize: "60vh",
    fontWeight: 400,
    lineHeight: 0.6,
    userSelect: "none",
};

interface ButtonProps {
    onClick: () => void;
}
const AddButton = (props: ButtonProps) => (
    <Button variant="contained" color="success" sx={{mx: 3}} {...props}>
        <Add sx={{fontSize: "5rem"}}/>
    </Button>
);
const RemoveButton = (props: ButtonProps) => (
    <Button variant="contained" color="error" sx={{mx: 3}} {...props}>
        <Remove sx={{fontSize: "5rem"}}/>
    </Button>
);

function Game() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [showReset, setShowReset] = useState(false);
    const [showPrompt, confirmNavigation, cancelNavigation] =
      useCallbackPrompt(true);

    const home_plus_one = () => { dispatch?.({type: "home_plus_one"}); };
    const home_minus_one = () => { dispatch?.({type: "home_minus_one"}); };
    const guest_plus_one = () => { dispatch?.({type: "guest_plus_one"}); };
    const guest_minus_one = () => { dispatch?.({type: "guest_minus_one"}); };

    const toolbar = <>
        <Button
            color="inherit"
            startIcon={<Undo/>}
            onClick={() => { dispatch?.({type: 'rollback_score'}); }}
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

    return (
    <Layout title="8/9/10-Ball" fullwidth toolbar={toolbar}>
        <Stack height="100%" alignItems="center" justifyContent="space-around">
            <Grid container justifyContent="space-evenly" mt="1em">
                <Grid item xs={5} textAlign="center">
                    <Typography variant="h1">Heim</Typography>
                </Grid>
                <Grid item xs={2} textAlign="center">
                    <Typography variant="h1">vs</Typography>
                </Grid>
                <Grid item xs={5} textAlign="center">
                    <Typography variant="h1">Gast</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={5} textAlign="center" onClick={home_plus_one}>
                    <Typography variant="h1" sx={scoreSx}>
                        {state.score_home}
                    </Typography>
                </Grid>
                <Grid item xs={2} textAlign="center">
                    <Typography variant="h1" sx={scoreSx}>:</Typography>
                </Grid>
                <Grid item xs={5} textAlign="center" onClick={guest_plus_one}>
                    <Typography variant="h1" sx={scoreSx}>
                        {state.score_guest}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" mb="2em">
                <Grid item xs={5} textAlign="center">
                    <AddButton onClick={home_plus_one}/>
                    <RemoveButton onClick={home_minus_one}/>
                </Grid>
                <Grid item xs={2} textAlign="center">
                </Grid>
                <Grid item xs={5} textAlign="center">
                    <AddButton onClick={guest_plus_one}/>
                    <RemoveButton onClick={guest_minus_one}/>
                </Grid>
            </Grid>
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
                dispatch?.({type: 'reset_score'});
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