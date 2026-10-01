import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db();

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `
        <h1>Reset Yout Password.</h1>
        Click the link to reset your password: ${url}
        <p>Please Ignore if you haven't requested a password reset.</p>
        `,
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `<h1>Please Verify Your E-mail Address.</h1>
        Click <a href="${url}">here</a> to reset your password.`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
  //...
});
