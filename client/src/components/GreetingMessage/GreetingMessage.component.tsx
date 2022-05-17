import React from "react";
// import { InputContext } from "../FormInput/FormInput.component";
import "./GreetingMessage.styles.scss";

interface FormInputProps {
  firstName: string;
  surname: string;
}

export const GreetingMessage: React.FC<FormInputProps> = (
  props
): JSX.Element => {
  const capitalizeName = () => {
    const firstName =
      props.firstName.charAt(0).toUpperCase() + props.firstName.slice(1);
    const surname =
      props.surname.charAt(0).toUpperCase() + props.surname.slice(1);
    return `${firstName} ${surname}`;
  };

  return (
    <div
      className={`greeting-message ${
        props.firstName.length !== 0 ? "" : "greeting-message--hidden"
      }`}
    >
      {`Welcome again, ${capitalizeName()}!`}
    </div>
  );
};

export default GreetingMessage;
