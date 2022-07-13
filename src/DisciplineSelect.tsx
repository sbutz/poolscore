import { Button, Grid, } from '@mui/material';
import { Link } from "react-router-dom";

function DisciplineSelect() {
    return (
    <Grid container alignItems="center" spacing={2} justifyContent="space-evenly" height="100vh">
        <Grid item>
            <Button variant="contained" component={Link} to={"/game"} style={{fontSize: "5rem"}}>
                8/9/10 Ball
            </Button>
        </Grid>
        <Grid item>
            <Button variant="contained" style={{fontSize: "5rem"}} disabled>
                14/1 endlos
            </Button>
        </Grid>
    </Grid>
    );
}

export default DisciplineSelect;