import { memo, ReactNode } from "react";
import { Box, Divider, Typography, Stack } from "@mui/material";

import { Match } from "../store/MatchdayState";
import FormField from "./FormField";

const Row = (children: ReactNode, responsive? : boolean) => {
    if (responsive)
        return <Stack direction={{xs: 'column', md: 'row'}}>{children}</Stack>;
    else
        return <Stack direction='row'>{children}</Stack>;
}

const Column = (children: ReactNode) => (
    <Stack direction="row" alignItems="center">${children}</Stack>
)

interface MatchFormProps {
    match: Match;
}

export default memo(MatchForm);
function MatchForm(props: MatchFormProps) {
    const m = props.match;
    return <>
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
                    />
                    {m.team ?
                    <FormField
                        label={`Spieler (${t === 'home' ? 'Heim' : 'Gast'})`}
                        value={m.players[t as keyof typeof m.players][1]}
                    /> : null
                    }
                    {m.discipline === "14/1 endlos" ?
                    <Stack direction="row">
                        <FormField
                            label="Bälle"
                            type="number"
                            value={String(55)}
                        />
                        <FormField
                            label="Aufn."
                            type="number"
                            value={String(10)}
                        />
                        <FormField
                            label="HS"
                            type="number"
                            value={String(11)}
                        />
                    </Stack> : null}
                </Stack>
            ))}
            <Stack direction="column">
                <Stack direction="row" alignItems="center">
                    <Box width="6rem">
                        <FormField
                            label="Heim"
                            type="number"
                            value={String(0)}
                        />
                    </Box>
                    <Typography>:</Typography>
                    <Box width="6rem">
                        <FormField
                            label="Gast"
                            type="number"
                            value={String(0)}
                        />
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    </>
}
