/*
--The input field becomes hidden only when isSubmit state is true
--isSubmit becomes true only when isValid is true
*/

import React, { useState, createContext, FormEvent } from "react";
import "./Form.styles.scss";
import Greeting from "../Greeting/Greeting.component";
import FormInput from "../FormInput/FormInput.component";
const axios = require("axios");

export const InputContext = createContext({});

export const Form: React.FC = () => {
  const [isSubmitted, setSubmit] = useState(false); // submitted state
  const [isValid, setValid] = useState(true); // valid state

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveInput()

    axios.get("http://localhost:4000/users").then(function () {
      // handle success
      console.log("done");
    });
    setSubmit(!!isValid);
    
  };

  const saveInput = (): string => {
    return `hello from parent`;
  }

  return (
    <>
      <form
        className={`formInput ${isSubmitted ? "formInput--hidden" : ""}`}
        onSubmit={(e) => handleSubmit(e)}
        autoComplete="off"
      >
        {/* NOTE: I can submit the form with one <FormInput /> element but nothing happens when two are existed*/}
        {/* <FormInput labelName="First Name" /> */}
        <FormInput labelName="Surname" onSaveInput={saveInput} />
      </form>
    </>
  );
};

export default Form;
