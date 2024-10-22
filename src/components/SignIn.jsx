import styles from "./SignIn.module.css";
import Button from "../components/Button";

import { auth, db, googleProvider } from "../config/Firebase";
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn({ setIsLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmitSignIn(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) navigate("/app");
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
      console.error(err.code);
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
      if (auth.currentUser) navigate("/app");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // async function handleSignOut(e) {
  //   e.preventDefault();
  //   setMessage("");
  //   try {
  //     await signOut(auth);
  //     alert("Succesfully logout");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <form className={styles.formLeft}>
      <h2>Welcome back!</h2>
      <div className={styles.row}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <p className={styles.formMessage}>{message}</p>

      <div className={styles.btns}>
        <Button type="primary" onClick={handleSubmitSignIn}>
          Sign In
        </Button>

        <Button type="back">Back</Button>
      </div>

      <Button type="forGoogleAuth" onClick={handleSignInWithGoogle}>
        Sign In with Google
      </Button>
    </form>
  );
}

export default SignIn;
