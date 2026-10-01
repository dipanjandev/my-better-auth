"use client";

import { updateUser } from "../../../lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";

export default function profilePage() {
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    // alert("Form submitted successfully!");
    // console.log("In the form data", userData);
    try {
      const resData = await updateUser({
        name: userData.name,
      });

      // alert("SuccessFully Done");
      const id = toast.success("Name Changed Successfully.", {
        description: "User Information has been updated",
        actionProps: {
          children: "Close",
          className: "bg-success text-success-foreground",
          onPress: () => toast.close(id),
        },
      });
    } catch (error) {
      console.error("Update Failed", error);
      toast.danger("Update Failed", {
        description: "Could not update user Information. Please try again.",
      });
    }
  };

  return (
    <Form className="w-full max-w-96" onSubmit={handleUpdateUser}>
      <Fieldset>
        <Fieldset.Legend>Profile Settings</Fieldset.Legend>
        <Description>Update your profile information.</Description>
        <FieldGroup>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
        </FieldGroup>
        <Fieldset.Actions>
          <Button type="submit">
            <FloppyDisk />
            Save changes
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
}
