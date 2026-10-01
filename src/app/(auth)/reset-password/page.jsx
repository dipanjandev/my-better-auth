import React, { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

const resetPasswordPage = () => {
  return (
    <div>
      <h2>Reset Password Page</h2>
      <Suspense fallback="Loading...">
        <ResetPasswordForm></ResetPasswordForm>
      </Suspense>
    </div>
  );
};

export default resetPasswordPage;
