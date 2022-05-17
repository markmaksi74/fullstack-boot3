import { Formik, Form } from "formik";
import { TextField } from "../TextInput/TextInput";
import * as Yup from "yup";

interface inputProps {
  label: string;
  name: string;
  type: string;
}

const GreetingForm = () => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "input value cannot exceed 150 characters")
      .required("input value cannot be empty")
      .matches(/[^a-zA-Z0-9]/, "non-alphanumeric characters are not allowed"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required")
      .matches(/[^a-zA-Z0-9]/, "non-alphanumeric characters are not allowed"),
  });

  let inputNameProps: inputProps = {
    label: "Name",
    name: "name",
    type: "text",
  };

  let inputSurnameProps: inputProps = {
    label: "Surname",
    name: "surname",
    type: "text",
  };

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <Form>
          <TextField
            label={inputNameProps.label}
            name={inputNameProps.name}
            type={inputNameProps.type}
          />
          <TextField
            label={inputSurnameProps.label}
            name={inputSurnameProps.name}
            type={inputSurnameProps.type}
          />
          <button className="btn btn-dark mt-3" type="submit">
            Register
          </button>
          <button className="btn btn-danger mt-3 ml-3" type="reset">
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default GreetingForm;
