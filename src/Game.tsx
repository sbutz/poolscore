import { useContext } from 'react';
import { Button, Grid, Stack, Typography, } from '@mui/material'
import { Add, Remove, } from '@mui/icons-material';

import { Context } from './Store';
import Layout from './Layout';

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
    const [state, dispatch] = useContext(Context);

    const home_plus_one = () => { dispatch?.({type: "home_plus_one"}); };
    const home_minus_one = () => { dispatch?.({type: "home_minus_one"}); };
    const guest_plus_one = () => { dispatch?.({type: "guest_plus_one"}); };
    const guest_minus_one = () => { dispatch?.({type: "guest_minus_one"}); };

    return (
    <Layout>
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
    </Layout>
    );
}

export default Game;