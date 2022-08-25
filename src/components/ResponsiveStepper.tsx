import { ReactNode, useCallback, useMemo, useState } from "react";
import { useTheme, MobileStepper, Button, Stepper, Step, StepLabel, StepContent, Stack, useMediaQuery } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";

import Layout from "./Layout";

interface ResponsiveStepperProps {
    title: string;
    steps: {
        label: string;
        content: ReactNode;
    }[];
    onCancel?: () => void;
    onSave?: () => void;
}

function MyMobileStepper(props : ResponsiveStepperProps) {
    const [activeStep, setActiveStep] = useState(0);

    const { onCancel, onSave } = props;
    const numSteps = props.steps.length;
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === numSteps - 1;

    const handleNext = useCallback(() => {
        if (isLastStep)
            onSave?.();
        else
            setActiveStep((prev: number) => prev + 1);
    }, [onSave, isLastStep]);
    const handleBack = useCallback(() => {
        if (isFirstStep)
            onCancel?.();
        else
            setActiveStep((prev: number) => prev - 1);
    }, [onCancel, isFirstStep]);

    const stepper = useMemo(() => (
        <MobileStepper
            steps={numSteps}
            activeStep={activeStep}
            nextButton={
                <Button size="small" onClick={handleNext}>
                    {isLastStep ? 'Speichern' : 'Weiter'}
                    {isLastStep ? null : <KeyboardArrowRight/>}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack}>
                    {isFirstStep ? null : <KeyboardArrowLeft/>}
                    {isFirstStep ? 'Abbrechen' : 'Zurück'}
                </Button>
            }
        />
    ), [numSteps, activeStep, isFirstStep, isLastStep, handleBack, handleNext]);

    return <>
        <Layout nested title={props.steps[activeStep].label}>
            {props.steps[activeStep].content}
        </Layout>
        {stepper}
    </>;
}

function MyDesktopStepper(props: ResponsiveStepperProps) {
    return (
        <Layout nested title={props.title}>
            <Stepper orientation="vertical">
                {/*TODO: optimize render of step away, requires const/memo steps */}
                {props.steps.map((s) => (
                    <Step key={s.label} active={true}>
                        <StepLabel>{s.label}</StepLabel>
                        <StepContent>{s.content}</StepContent>
                    </Step>
                ))}
            </Stepper>
            <Stack direction="row" justifyContent="center" spacing={3} sx={{pt: 3}}>
                <Button variant="contained" onClick={props.onCancel}>
                    Abbrechen
                </Button>
                <Button variant="contained" onClick={props.onSave}>
                    Speichern
                </Button>
            </Stack>
        </Layout>
    );
}

export default function ResponsiveStepper(props: ResponsiveStepperProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return isMobile ?
        <MyMobileStepper {...props} /> : <MyDesktopStepper {...props} />;
}