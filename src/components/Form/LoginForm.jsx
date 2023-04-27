import { useRouter } from "next/router";
import { useState } from "react";
import { loginUser } from "../../../lib/helpers";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await loginUser(email, password);
      if (res.error) {
        setSubmitError(res.error);
      }
      if (res.ok) {
        router.push("/profile");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setSubmitError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          Login
        </button>
        {submitError && <p>{submitError}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
