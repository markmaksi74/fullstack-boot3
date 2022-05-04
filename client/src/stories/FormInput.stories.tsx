import React from "react";

import Form from "../components/Form/Form.component";
import exclamation from "../../images/circle-exclamation-solid.png";


export default {
  title: "Form Input",
  component: Form,
};

export const Input = () => {
  return (
    <>
      <Form />
    </>
  );
};

const image = {
  src: exclamation,
  alt: 'exclamation-error',
};