/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React from 'react';

export default function FormStepper({ props }) {
  // const { steps, activeStep, handleBack, handleNext, handleReset, showLastButton, setActiveStep } =
  //   props;
  const { steps, activeStep, handleBack, handleNext, handleReset, showLastButton } = props;
  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Son Adım</Typography>
                ) : null
              }
              // onClick={() => setActiveStep && setActiveStep(index)}
            >
              {/* <Typography variant="h5" sx={{ cursor: 'pointer' }}>
                {step.label}
              </Typography> */}
              <Typography variant="h5">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Box sx={{ my: 4 }}>{step.formElemet}</Box>
              {showLastButton === false ? null : (
                <Box sx={{ mb: 2 }}>
                  <Box>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Geri
                    </Button>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      {index === steps.length - 1 ? 'Bitir' : 'Devam'}
                    </Button>
                  </Box>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
          <Typography>
            Tüm adımlar tamamlandı isterseniz başa dönebilirsiniz veya eksik form işleminiz
            tamamlayabilirsiniz.
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Başa Dön
          </Button>
        </Paper>
      )}
    </Box>
  );
}
