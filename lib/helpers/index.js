import { signIn } from "next-auth/react";

export const getErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.message;
    } else if (error.request) {
        return error.request;
    } else {
        return error.message;
    }
};

export const loginUser = async (email, password) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });
  return res;
};
