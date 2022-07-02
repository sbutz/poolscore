import {
    Button,
    Grid,
    Stack,
    Typography,
} from '@mui/material'
import {
    Add,
    Home,
    Remove,
} from '@mui/icons-material';
import { Link } from "react-router-dom";

const scoreSx = {
    fontSize: "40rem",
    fontWeight: 400,
    lineHeight: 1,
};

const AddButton = () => (
    <Button variant="contained" color="success" sx={{mx: 3}}>
        <Add sx={{fontSize: "5rem"}}/>
    </Button>
);
const RemoveButton = () => (
    <Button variant="contained" color="error" sx={{mx: 3}}>
        <Remove sx={{fontSize: "5rem"}}/>
    </Button>
);

function Game() {
    return (
        <Stack height="100vh" alignItems="center">
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
                <Grid item xs={5} textAlign="center">
                    <Typography variant="h1" sx={scoreSx}>0</Typography>
                </Grid>
                <Grid item xs={2} textAlign="center">
                    <Typography variant="h1" sx={scoreSx}>:</Typography>
                </Grid>
                <Grid item xs={5} textAlign="center">
                    <Typography variant="h1" sx={scoreSx}>0</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item xs={5} textAlign="center">
                    <AddButton />
                    <RemoveButton />
                </Grid>
                <Grid item xs={2} textAlign="center">
                    {/*TODO: better color*/}
                    {/*TODO: alert before before routing*/}
                    <Button variant="contained" color="secondary" component={Link} to={"/"}>
                        <Home sx={{fontSize: "5rem"}}/>
                    </Button>
                </Grid>
                <Grid item xs={5} textAlign="center">
                    <AddButton />
                    <RemoveButton />
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Game;