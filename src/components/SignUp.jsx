import styles from "./SignIn.module.css";
import Button from "../components/Button";

import { auth, googleProvider } from "../config/Firebase";
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpinnerFullPage from "./SpinnerFullPage";

function SignUp({ setIsSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmitSignUp(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        navigate("/app");
      }
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setMessage("Invalid user credential. User does not exist");
      } else if (err.code === "auth/invalid-email") {
        setMessage("Invalid email");
      } else if (err.code === "auth/too-many-requests") {
        setMessage(
          "Too many requests. You can immediately restore it by resetting your password or you can try again later"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithGoogle(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth.currentUser) {
        navigate("/app");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignOut(e) {
    e.preventDefault();
    setMessage("");
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading) return <SpinnerFullPage />;

  return (
    <form className={styles.form}>
      <h2>Create an Account</h2>

      <div className={styles.row}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <p className={styles.errorMessage}>{message}</p>

      <div className={styles.btns}>
        <Button type="primary" onClick={handleSubmitSignUp}>
          Sign Up
        </Button>

        <Button type="back" onClick={handleSignOut}>
          Logout
        </Button>
      </div>

      <Button type="primary" onClick={() => setIsSignUp(false)}>
        I Have account
      </Button>

      <Button type="forGoogleAuth" onClick={handleSignInWithGoogle}>
        Sign In with Google
      </Button>
    </form>
  );
}

export default SignUp;
