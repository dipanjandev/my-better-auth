"use client";
import { requestPasswordReset } from "../../../lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import React from "react";

const forgotPasswordPage = () => {
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    // console.log("Userdata Before Submit", userData);

    const resData = await requestPasswordReset({
      email: userData.email,
      redirectTo: "/reset-password",
    });
    console.log("after reset password", resData);
  };
  return (
    <div>
      <h2>Forgot Password?</h2>
      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={handleForgotPassword}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default forgotPasswordPage;
