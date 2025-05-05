import Button from "../Button";

/**
 * Component that displays reservation steps with buttons and icons.
 * It allows users to navigate through different steps of the reservation process and track their progress.
 *
 * @param {Array} steps - Array of step objects containing step number, name, and icon.
 * @param {number} step - The current step number.
 * @param {function} changeStep - Function to change the current step.
 * @param {function} reflectUserChoice - Function to show user choices in the step name.
 * @returns
 */
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
