/*
--The input field becomes hidden only when isSubmit state is true
--isSubmit becomes true only when isValid is true
*/

import React, { useState } from "react";
import "./GreetingForm.styles.scss";
import GreetingMessage from "../GreetingMessage/GreetingMessage.component";
import exclamation from "../../../images/circle-exclamation-solid.png";
import axios from "axios";

interface Greeting {
  firstName: string;
  surname: string;
}

interface FormValues {
  nameInputValue: string;
  surnameInputValue: string;
}

interface FormValuesErrors {
  nameInputValue: string;
  surnameInputValue: string;
}

interface FormErrors {
  nameInputValue: string;
  surnameInputValue: string;
}

interface User {
  firstName: string;
  surname: string;
}

const userData: User = {
  firstName: "",
  surname: "",
};

const formValues: FormValues = {
  nameInputValue: "",
  surnameInputValue: "",
};

const formErrors: FormErrors = {
  nameInputValue: "Input cannot be empty",
  surnameInputValue: "Input cannot be empty",
};

const defaultValuesState = (): FormValues => {
  return formValues;
};

const defaultErrorsState = (): FormErrors => {
  return formErrors;
};

export const GreetingForm: React.FC = () => {
  const [formValues, setFormValues] = useState(() => defaultValuesState());
  const [formErrors, setFormErrors] = useState(() => defaultErrorsState());
  const [isSubmitted, setSubmit] =
    useState<undefined | false | true>(undefined);
  const [nameIsValid, setNameValid] =
    useState<undefined | false | true>(undefined);
  const [surnameIsValid, setSurnameValid] =
    useState<undefined | false | true>(undefined);
  const [formIsValid, setFormValid] =
    useState<undefined | false | true>(undefined);
  const [btnName, setBtnName] = useState("SUBMIT");
  const [serverMessage, setServerMessage] = useState("");
  const [requestedUser, setRequestedUser] = useState(userData);

  // changes the formValues as the user fills the input fields
  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const changed = { ...formValues, [name]: value };
    setFormValues(changed);
    setFormErrors(validate(changed));
    console.log(changed);
  };

  const validate = (formValues: FormValues): FormValuesErrors => {
    let errors: FormValuesErrors = {
      nameInputValue: "",
      surnameInputValue: "",
    };

    if (formValues.nameInputValue.length > 150) {
      errors.nameInputValue = "Input field cannot exceed 150 characters";
      setNameValid(false);
    } else if (/[^a-zA-Z0-9]/.test(formValues.nameInputValue)) {
      errors.nameInputValue = "non-alphanumeric characters are not allowed";
      setNameValid(false);
    } else if (formValues.nameInputValue.length === 0) {
      // this occurs when the user input something and then erases it to empty input
      errors.nameInputValue = "Input cannot be empty";
      setNameValid(undefined);
    } else if (formValues.nameInputValue.length <= 150) {
      errors.nameInputValue = "";
      setNameValid(true);
    }

    if (formValues.surnameInputValue.length > 150) {
      errors.surnameInputValue = "Input field cannot exceed 150 characters";
      setSurnameValid(false);
    } else if (/[^a-zA-Z0-9]/.test(formValues.surnameInputValue)) {
      errors.surnameInputValue = "non-alphanumeric characters are not allowed";
      setSurnameValid(false);
    } else if (formValues.surnameInputValue.length === 0) {
      errors.surnameInputValue = "Input cannot be empty";
      setSurnameValid(undefined);
    } else {
      errors.surnameInputValue = "";
      setSurnameValid(true);
      return errors;
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameIsValid && surnameIsValid) {
      setFormValid(true);
    } else if (nameIsValid === false || surnameIsValid === false) {
      setFormValid(false);
    }

    if (nameIsValid && surnameIsValid) {
      setSubmit(true);
      setBtnName("Adding user...");
      setTimeout(() => {
        axios
          .post("http://localhost:4000/users", {
            firstName: formValues.nameInputValue,
            surname: formValues.surnameInputValue,
          })
          .then((response) => {
            const requestedUser = response.data;
            setRequestedUser(requestedUser);
            setBtnName("SUBMIT");
          })
          .catch((error) => {
            setBtnName("SUBMIT");
            setServerMessage("User not found!");
          });
      }, 1500);
    }
    setSubmit(false);
  };

  const emptyNameInvalidSubmitState =
    formValues.nameInputValue === "" && isSubmitted === false;

  const initialNameInvalidInputState =
    formValues.nameInputValue === "" && isSubmitted === undefined;

  const emptySurnameInvalidSubmitState =
    formValues.surnameInputValue === "" && isSubmitted === false;

  const initialSurnameInvalidInputState =
    formValues.surnameInputValue === "" && isSubmitted === undefined;

  let greetingMessage: Greeting = {
    firstName: requestedUser.firstName,
    surname: requestedUser.surname,
  };

  return (
    <>
      <form
        className={`form-input ${
          requestedUser.firstName.length !== 0 ? "form-input--hidden" : ""
        }`}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label
          className={`${
            nameIsValid === false || emptyNameInvalidSubmitState
              ? "form-input--invalidLabel"
              : ""
          } form-input__label `}
        >
          Name
        </label>
        <img
          src={exclamation}
          className={`${
            initialNameInvalidInputState || nameIsValid
              ? "icon-error--hidden"
              : "icon-error--show"
          } icon-error`}
          alt="error"
        />
        <input
          className={`${
            nameIsValid === true || emptyNameInvalidSubmitState
              ? "form-input--validInput"
              : ""
          }
          ${
            nameIsValid === false || emptyNameInvalidSubmitState
              ? "form-input--invalidInput"
              : ""
          } 
          ${
            formValues.nameInputValue.length === 0
              ? "form-input--defaultInput"
              : ""
          }
          form-input__input`}
          type="text"
          name="nameInputValue"
          value={formValues.nameInputValue}
          onChange={(e) => handleChange(e)}
        />
        <p className="form-input__error-message">
          {initialNameInvalidInputState ? "" : formErrors.nameInputValue}
        </p>

        <label
          className={`${
            surnameIsValid === false || emptySurnameInvalidSubmitState
              ? "form-input--invalidLabel"
              : ""
          } form-input__label `}
        >
          Surname
        </label>
        <img
          src={exclamation}
          className={`${
            initialSurnameInvalidInputState || surnameIsValid
              ? "icon-error--hidden"
              : "icon-error--show"
          } icon-error`}
          alt="error"
        />
        <input
          className={`${
            surnameIsValid === true || emptySurnameInvalidSubmitState
              ? "form-input--validInput"
              : ""
          }
          ${
            surnameIsValid === false || emptySurnameInvalidSubmitState
              ? "form-input--invalidInput"
              : ""
          } 
          ${
            formValues.surnameInputValue.length === 0
              ? "form-input--defaultInput"
              : ""
          }
          form-input__input`}
          type="text"
          name="surnameInputValue"
          value={formValues.surnameInputValue}
          onChange={(e) => handleChange(e)}
        />
        <p className="form-input__error-message">
          {initialSurnameInvalidInputState ? "" : formErrors.surnameInputValue}
        </p>
        <div className="submit">
          <button className="submit__button" type="submit">
            {btnName}
          </button>
          <p className="submit__error">{`${serverMessage}`}</p>
        </div>
      </form>
      <GreetingMessage
        firstName={greetingMessage.firstName}
        surname={greetingMessage.surname}
      />
    </>
  );
};

export default GreetingForm;
