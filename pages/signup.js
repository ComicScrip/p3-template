import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signup } from "../apiClient";
import { passwordStrength } from "check-password-strength";

const notifySignupSuccess = () =>
  toast("Thanks ! You should now be able to connect !", {
    position: "bottom-center",
  });

export default function SignupPage() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordStrength(password));
    setError("");
    if (["Too weak", "Weak"].includes(passwordStrength(password).value))
      return setError(
        "Your password should be more than 8 caracters and should include a non-capital letter, a capital letter, a symbol and a number"
      );
    if (password !== passwordConfirmation)
      return setError("Passwords do not match");

    signup({ name, email, password })
      .then(notifySignupSuccess)
      .catch((err) => {
        if (err.response.status === 409);
        setError("Email already exists");
      });
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            required
            data-cy="name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            required
            data-cy="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            required
            data-cy="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="passwordConfirmation">
          Password confirmation:
          <input
            required
            data-cy="passwordConfirmation"
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>

        <p>{error}</p>

        <button data-cy="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
