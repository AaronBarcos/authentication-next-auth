import NextAuth from "next-auth/next";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import dbConnect from "../../../../lib/db";
import User from "../../../../lib/models/User.model";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email : { label: "Email", type: "text", placeholder: "jsmith" },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        await dbConnect().catch((err) => {
          console.log(err);
        });


        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        // Add logic here to look up the user from the credentials supplied
        

        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("Invalid credentials");
        } 

        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        // You can also Reject this callback with an Error or with a URL:
        // throw new Error('error message') // Redirect to error page
        // throw '/path/to/redirect'        // Redirect to a URL
        // return { id: user.id, name: user.name, email: user.email }
        return user;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        
      },
    }),

    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  session: {
    strategy: "jwt"
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
});
