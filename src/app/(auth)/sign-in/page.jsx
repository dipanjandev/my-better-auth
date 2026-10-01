"use client";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "../../../lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import Link from "next/link";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data, "Login data");
    const { data: resData, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });
    // console.log(resData, error);
  };

  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="h-screen container mx-auto">
      <div className="grid justify-center items-center">
        <h1 className="text-center text-3xl font-bold my-20">
          This is Signin Page
        </h1>
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          {/* Enter Email Box */}
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
            <Input placeholder="Enter your E-mail" />
            <FieldError />
          </TextField>
          {/* Enter Password Box With Eye */}
          <TextField className="w-full" name="password" isRequired>
            <Label>Password</Label>
            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={isVisible ? "text" : "password"}
                placeholder="Enter Your Password"
              />
              <InputGroup.Suffix className="pe-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>
          <div className="flex gap-2">
            <Button type="submit">
              {/* <Check /> */}
              Submit
            </Button>
            <Link href="/forgot-password">
              <Button variant="secondary">Forgot Password</Button>
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default SignInPage;
