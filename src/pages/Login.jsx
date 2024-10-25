import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styles from "./Login.module.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className={styles.login}>
      {!isSignUp ? (
        <SignIn setIsSignUp={setIsSignUp} />
      ) : (
        <SignUp setIsSignUp={setIsSignUp} />
      )}
    </main>
  );
}

export default Login;
