/*
--The input field becomes hidden only when isSubmit state is true
--isSubmit becomes true only when isValid is true
*/

import React, { useState, createContext } from "react";
import "./FormInput.styles.scss";
import Greeting from "../Greeting/Greeting.component";
import exclamation from "../../../images/circle-exclamation-solid.png";
import {
  FormValues,
  FormValuesErrors,
  FormErrors,
} from "../../Interfaces/formInput.interfaces";

type InputProps = {
  labelName: string;
}

export const InputContext = createContext({});
const formValues: FormValues = { inputValue: "" };

const defaultValuesState = (): FormValues => {
  return formValues;
};

const defaultErrorsState = (): FormErrors => {
  return formValues;
};

export const FormInput: React.FC<InputProps> = (props: InputProps) => {
  const [formValues, setFormValues] = useState(() => defaultValuesState()); // default state
  const [formErrors, setFormErrors] = useState(() => defaultErrorsState()); // invalid state
  const [isValid, setValid] = useState(true); // valid state

  // changes the formValues as the user fills the input fields
  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const changed = { ...formValues, [name]: value }; // Spread the default state to preserve the values
    setFormValues(changed);
    setFormErrors(validate(changed));
  };

  const validate = (formValues: FormValues): FormValuesErrors => {
    const errors: FormValuesErrors = { inputValue: "" };
    if (formValues.inputValue.length > 150) {
      errors.inputValue = "Input field cannot exceed 150 characters";
      setValid(false);
    } else if (/[^a-zA-Z0-9]/.test(formValues.inputValue)) {
      errors.inputValue = "non-alphanumeric characters are not allowed.";
      setValid(false);
    } else {
      setValid(true);
    }
    return errors; // changes the empty formErrors to "errors" object
  };

  return (
    <>
      <label
        className={`${
          formValues.inputValue.length === 0 ||
          formValues.inputValue.length < 150
            ? ""
            : "formInput--invalidLabel"
        } ${
          /[^a-zA-Z0-9]/.test(formValues.inputValue)
            ? "formInput--invalidLabel"
            : ""
        }  formInput__label `}
      >
        {props.labelName}
      </label>
      <img
        src={exclamation}
        className={`${isValid ? "element-hidden" : ""} errorIcon`}
        alt="error"
      />
      <input
        className={`${
          formValues.inputValue.length > 0 && formValues.inputValue.length < 150
            ? "formInput--validInput"
            : ""
        }
          ${
            formValues.inputValue.length >= 150 ? "formInput--invalidInput" : ""
          }
          ${
            /[^a-zA-Z0-9]/.test(formValues.inputValue)
              ? "formInput--invalidInput"
              : ""
          } 
          ${formValues.inputValue.length === 0 ? "formInput--defaultInput" : ""}
          formInput__input`}
        required
        type="text"
        name="inputValue"
        value={formValues.inputValue}
        onChange={(e) => handleChange(e)}
      />
      <p className="formInput__error-message">{formErrors.inputValue}</p>
    </>
  );
};

export default FormInput;
