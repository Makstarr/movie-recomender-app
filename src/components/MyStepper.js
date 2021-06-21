import { StepLabel, Stepper, Step } from "@material-ui/core";

export const MyStepper = ({step}) => {
  return (
    <Stepper activeStep={step}>
      {[1,2,3].map((label, index) => {
        return (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
