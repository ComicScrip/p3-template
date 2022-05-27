import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { passwordStrength } from "check-password-strength";
import Layout from "../components/Layout";

const notifyRegisterSuccess = () => toast("Thanks ! You can now log in !");

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    if (password !== passwordConfirmation)
      return setError("passwords do not match");

    if (["Too Weak", "Weak"].includes(passwordStrength(password).value))
      return setError(
        "password is too weak. It must contain an uppercase letter, a lowercase letter, a symbol and a number"
      );

    axios
      .post("/api/users", { email, password, name })
      .then(notifyRegisterSuccess)
      .catch((err) => {
        if (err.response.status === 409) setError("This email already exists");
      });
  };

  return (
    <Layout pageTitle="Sign up">
      <Toaster />
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name :
          <input
            required
            type="text"
            id="name"
            data-cy="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email :
          <input
            required
            type="email"
            id="email"
            data-cy="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password :
          <input
            required
            type="password"
            id="password"
            data-cy="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label htmlFor="passwordConfirmation">
          Password confirmation :
          <input
            required
            type="password"
            id="passwordConfirmation"
            data-cy="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <p>{error}</p>
        <button data-cy="registerBtn" type="submit">
          Register
        </button>
      </form>
    </Layout>
  );
}
