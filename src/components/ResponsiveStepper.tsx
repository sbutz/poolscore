import {
  ReactNode, useCallback, useMemo, useState,
} from 'react';
import {
  useTheme, MobileStepper, Button, Stepper, Step, StepLabel, StepContent, Stack, useMediaQuery,
} from '@mui/material';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';

import Layout from './Layout';

interface StepProp {
  label: string;
  content: ReactNode;
}

interface ResponsiveStepperProps {
  title: string;
  steps: StepProp[];
  onCancel?: () => void;
  onSave?: () => void;
}

interface MobileStepperProps {
  steps: StepProp[];
  onCancel?: () => void;
  onSave?: () => void;
}

function MyMobileStepper({
  steps, onCancel = undefined, onSave = undefined,
}: MobileStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = useCallback(() => {
    if (isLastStep) onSave?.();
    else setActiveStep((prev: number) => prev + 1);
  }, [onSave, isLastStep]);
  const handleBack = useCallback(() => {
    if (isFirstStep) onCancel?.();
    else setActiveStep((prev: number) => prev - 1);
  }, [onCancel, isFirstStep]);

  const stepper = useMemo(() => (
    <MobileStepper
      steps={steps.length}
      activeStep={activeStep}
      nextButton={(
        <Button size="small" onClick={handleNext}>
          {isLastStep ? 'Speichern' : 'Weiter'}
          {isLastStep ? null : <KeyboardArrowRight />}
        </Button>
              )}
      backButton={(
        <Button size="small" onClick={handleBack}>
          {isFirstStep ? null : <KeyboardArrowLeft />}
          {isFirstStep ? 'Abbrechen' : 'Zurück'}
        </Button>
              )}
    />
  ), [steps.length, activeStep, isFirstStep, isLastStep, handleBack, handleNext]);

  return (
    <>
      <Layout nested title={steps[activeStep].label}>
        {steps[activeStep].content}
      </Layout>
      {stepper}
    </>
  );
}

function MyDesktopStepper({
  title, steps, onCancel = undefined, onSave = undefined,
}: ResponsiveStepperProps) {
  return (
    <Layout nested title={title}>
      <Stepper orientation="vertical">
        {/* TODO: optimize render of step away, requires const/memo steps */}
        {steps.map((s) => (
          <Step key={s.label} active>
            <StepLabel>{s.label}</StepLabel>
            <StepContent>{s.content}</StepContent>
          </Step>
        ))}
      </Stepper>
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ pt: 3 }}>
        <Button variant="contained" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button variant="contained" onClick={onSave}>
          Speichern
        </Button>
      </Stack>
    </Layout>
  );
}

export default function ResponsiveStepper({
  title, steps, onCancel = undefined, onSave = undefined,
}: ResponsiveStepperProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const Component = isMobile ? MyMobileStepper : MyDesktopStepper;
  return (
    <Component
      title={title}
      steps={steps}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
}
