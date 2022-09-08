import { Button, Grid, } from '@mui/material';
import { Link } from "react-router-dom";

import Layout from '../components/Layout';

const styles = {
    fontSize: "5rem",
}

function DisciplineSelect() {
    return (
    <Layout title="Freies Spiel" fullwidth>
        <Grid container alignItems="center" spacing={2} justifyContent="space-evenly" height="100%">
            <Grid item>
                <Button variant="contained" component={Link} to={"/game"} style={styles}>
                    8/9/10 Ball
                </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" component={Link} to={"/game14"} style={styles}>
                    14/1 endlos
                </Button>
            </Grid>
        </Grid>
    </Layout>
    );
}

export default DisciplineSelect;