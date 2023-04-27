import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getErrorMessage, loginUser } from "../../../lib/helpers";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateData = () => {
    const errors = [];
    if (!email || !username || !password) {
      errors.push("Please fill in all fields");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    if (!email.includes("@")) {
      errors.push("Please provide a valid email");
    }
    if (username.length < 4 || username.length > 20) {
      errors.push("Username must be between 4 and 20 characters long");
    }
    if (username.includes(" ")) {
      errors.push("Username must not contain spaces");
    }
    if (password.includes(" ")) {
      errors.push("Password must not contain spaces");
    }
    if (confirmPassword.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    setValidationErrors(errors);
    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateData()) {
      setLoading(true);
      setSubmitError("");
      try {
        const res = await axios.post("/api/auth/signup", {
          email,
          username,
          password,
        });

        const loginRes = await loginUser(email, password);

        if (loginRes && !loginRes.ok) {
          setSubmitError(getErrorMessage(loginRes));
        } else {
          router.push("/");
        }

        // if (res.data.message === "User created successfully") {
        //   router.push("/login");
        // }
        
      } catch (err) {
        setSubmitError(err.response.data.message);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        {validationErrors.length > 0 &&
          validationErrors.map((err) => <p key={err}>{err}</p>)}
        {submitError && <p>{submitError}</p>}
      </form>
    </div>
  );
}

export default SignupForm;
