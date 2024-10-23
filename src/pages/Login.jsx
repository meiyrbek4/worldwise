import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styles from "./Login.module.css";
import SpinnerFullPage from "../components/SpinnerFullPage";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className={styles.login}>
      {isLoading ? (
        <SpinnerFullPage />
      ) : (
        <>
          {!isSignUp ? (
            <SignIn setIsLoading={setIsLoading} setIsSignUp={setIsSignUp} />
          ) : (
            <SignUp setIsLoading={setIsLoading} setIsSignUp={setIsSignUp} />
          )}
        </>
      )}
    </main>
  );
}

export default Login;
