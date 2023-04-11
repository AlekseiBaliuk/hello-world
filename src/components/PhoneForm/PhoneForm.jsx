import { Button, Form } from "bootstrap-4-react/lib/components";
import React, { useState } from "react";
import { useAuth } from "../../firebase";

const PhoneForm = () => {
  const { signInWithPhone } = useAuth();
  const countryCode = "+38";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const requestCode = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setExpandForm(true);
    }
    signInWithPhone(phoneNumber);
  };

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerify = (e) => {
    let code = e.target.value;
    setVerifyCode(code);

    if (code.length === 6) {
      let confirmationResult = window.confirmationResult;

      confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
      <div className="App">
          <h2>Sign in with phone number</h2>
      <Form onSubmit={requestCode}>
        <Form.Group>
          <label htmlFor="phoneNumberInput">Phone</label>
          <Form.Input
            type="tel"
            id="phoneNumberInput"
            placeholder="Enter phone"
            value={phoneNumber}
            onChange={handleChange}
          />
          <Form.Text text="muted">Please enter your phone number.</Form.Text>
        </Form.Group>

        {expandForm === true ? (
          <>
            <Form.Group>
              <label htmlFor="codeInput">Code</label>
              <Form.Input
                type="number"
                id="codeInput"
                placeholder="Enter code"
                value={verifyCode}
                onChange={handleVerify}
              />
            </Form.Group>
          </>
        ) : null}

        {expandForm === false ? (
          <Button primary type="submit">
            Send code
          </Button>
        ) : null}

        <div id="recaptcha-container"></div>
      </Form>
    </div>
  );
};

export default PhoneForm;
