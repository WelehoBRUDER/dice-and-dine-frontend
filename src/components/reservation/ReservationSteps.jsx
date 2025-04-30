import Button from "../Button";

const ReservationSteps = ({steps, step, changeStep, reflectUserChoice}) => {
  return (
    <div className="reservation-steps flex-row">
      {steps.map((stepObj) => (
        <div
          className={`reservation-step flex-column center ${
            stepObj.step > step ? "disabled" : ""
          }`}
          key={stepObj.step}
        >
          <Button
            className={`reservation-step-button flex-row center ${
              step === stepObj.step ? "active" : ""
            }`}
            onClick={() => {
              if (stepObj.step !== step) {
                changeStep(stepObj.step);
              }
            }}
            icon={stepObj.icon}
          ></Button>
          <p className="reservation-step-text">
            {reflectUserChoice(stepObj.name)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReservationSteps;
